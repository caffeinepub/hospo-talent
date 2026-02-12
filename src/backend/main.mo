import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Application-specific roles mapping
  type AppRole = {
    #candidate;
    #employer;
    #admin;
  };

  // User Profile (required by frontend)
  public type UserProfile = {
    name : Text;
    email : Text;
    appRole : AppRole;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Required profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Helper to get app role
  func getAppRole(caller : Principal) : ?AppRole {
    switch (userProfiles.get(caller)) {
      case (null) { null };
      case (?profile) { ?profile.appRole };
    };
  };

  func isCandidate(caller : Principal) : Bool {
    switch (getAppRole(caller)) {
      case (?#candidate) { true };
      case (_) { false };
    };
  };

  func isEmployer(caller : Principal) : Bool {
    switch (getAppRole(caller)) {
      case (?#employer) { true };
      case (_) { false };
    };
  };

  func isAppAdmin(caller : Principal) : Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // Data Models
  var nextJobId : Nat = 1;
  var nextApplicationId : Nat = 1;

  // Job Type
  type JobType = {
    #fullTime;
    #partTime;
    #contract;
    #freelance;
  };

  type JobStatus = {
    #draft;
    #published;
    #closed;
  };

  // Job Posting
  type JobPosting = {
    id : Nat;
    employerId : Principal;
    title : Text;
    description : Text;
    location : Text;
    jobType : JobType;
    salary : Nat;
    status : JobStatus;
    slug : Text;
    created : Int;
    modified : Int;
  };

  // Candidate Profile
  type CandidateProfile = {
    userId : Principal;
    name : Text;
    resume : ?Text;
    skills : [Text];
    experience : Text;
    email : Text;
  };

  // Employer Profile
  type EmployerProfile = {
    userId : Principal;
    companyName : Text;
    companyDescription : Text;
    companyLocation : Text;
    email : Text;
  };

  // Application Status
  type ApplicationStatusType = {
    #applied;
    #shortlisted;
    #interview;
    #hired;
    #rejected;
  };

  // Application
  type Application = {
    id : Nat;
    jobId : Nat;
    candidateId : Principal;
    status : ApplicationStatusType;
    appliedAt : Int;
  };

  // Storage
  let jobs = Map.empty<Nat, JobPosting>();
  let candidateProfiles = Map.empty<Principal, CandidateProfile>();
  let employerProfiles = Map.empty<Principal, EmployerProfile>();
  let applications = Map.empty<Nat, Application>();
  let jobSlugs = Map.empty<Text, Nat>();

  // Job Management

  type JobInput = {
    title : Text;
    description : Text;
    location : Text;
    jobType : JobType;
    salary : Nat;
    status : JobStatus;
    slug : Text;
  };

  // Create/Save Job (Employer only)
  public shared ({ caller }) func saveJob(jobInput : JobInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save jobs");
    };
    if (not isEmployer(caller) and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Only employers can create jobs");
    };

    // Check slug uniqueness
    switch (jobSlugs.get(jobInput.slug)) {
      case (?existingId) {
        Runtime.trap("Job slug already exists");
      };
      case (null) {};
    };

    let jobId = nextJobId;
    nextJobId += 1;
    let now = Time.now();

    let job : JobPosting = {
      id = jobId;
      employerId = caller;
      title = jobInput.title;
      description = jobInput.description;
      location = jobInput.location;
      jobType = jobInput.jobType;
      salary = jobInput.salary;
      status = jobInput.status;
      slug = jobInput.slug;
      created = now;
      modified = now;
    };

    jobs.add(jobId, job);
    jobSlugs.add(jobInput.slug, jobId);
    jobId;
  };

  // Update Job (Employer who owns it, or Admin)
  public shared ({ caller }) func updateJob(jobId : Nat, jobInput : JobInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update jobs");
    };

    let existingJob = switch (jobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) { job };
    };

    // Check ownership or admin
    if (existingJob.employerId != caller and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only update your own jobs");
    };

    // Check slug uniqueness if changed
    if (existingJob.slug != jobInput.slug) {
      switch (jobSlugs.get(jobInput.slug)) {
        case (?existingId) {
          if (existingId != jobId) {
            Runtime.trap("Job slug already exists");
          };
        };
        case (null) {};
      };
      jobSlugs.remove(existingJob.slug);
      jobSlugs.add(jobInput.slug, jobId);
    };

    let now = Time.now();
    let updatedJob : JobPosting = {
      id = jobId;
      employerId = existingJob.employerId;
      title = jobInput.title;
      description = jobInput.description;
      location = jobInput.location;
      jobType = jobInput.jobType;
      salary = jobInput.salary;
      status = jobInput.status;
      slug = jobInput.slug;
      created = existingJob.created;
      modified = now;
    };

    jobs.add(jobId, updatedJob);
  };

  // Delete Job (Employer who owns it, or Admin)
  public shared ({ caller }) func deleteJob(jobId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can delete jobs");
    };

    let job = switch (jobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) { job };
    };

    if (job.employerId != caller and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only delete your own jobs");
    };

    jobs.remove(jobId);
    jobSlugs.remove(job.slug);
  };

  // Get Job by ID (Public for published, Employer for own jobs any status, Admin for all)
  public query ({ caller }) func getJob(jobId : Nat) : async ?JobPosting {
    let job = switch (jobs.get(jobId)) {
      case (null) { return null };
      case (?job) { job };
    };

    // Public can read published jobs
    switch (job.status) {
      case (#published) { return ?job };
      case (_) {};
    };

    // Authenticated employers can read their own jobs (any status)
    if (AccessControl.hasPermission(accessControlState, caller, #user)) {
      if (isEmployer(caller) and job.employerId == caller) {
        return ?job;
      };
      // Admin can read all
      if (isAppAdmin(caller)) {
        return ?job;
      };
    };

    null;
  };

  // Get Job by Slug (Public for published, Employer for own jobs any status, Admin for all)
  public query ({ caller }) func getJobBySlug(slug : Text) : async ?JobPosting {
    let jobId = switch (jobSlugs.get(slug)) {
      case (null) { return null };
      case (?id) { id };
    };

    let job = switch (jobs.get(jobId)) {
      case (null) { return null };
      case (?job) { job };
    };

    // Public can read published jobs
    switch (job.status) {
      case (#published) { return ?job };
      case (_) {};
    };

    // Authenticated employers can read their own jobs (any status)
    if (AccessControl.hasPermission(accessControlState, caller, #user)) {
      if (isEmployer(caller) and job.employerId == caller) {
        return ?job;
      };
      // Admin can read all
      if (isAppAdmin(caller)) {
        return ?job;
      };
    };

    null;
  };

  // List Jobs with Filters
  type JobFilters = {
    location : ?Text;
    jobType : ?JobType;
    salaryRange : ?(Nat, Nat);
    keyword : ?Text;
    status : ?JobStatus;
  };

  func matchesFilters(filters : JobFilters, job : JobPosting) : Bool {
    switch (filters.location) {
      case (?location) {
        if (job.location != location) { return false };
      };
      case (null) {};
    };
    switch (filters.jobType) {
      case (?jobType) {
        if (job.jobType != jobType) { return false };
      };
      case (null) {};
    };
    switch (filters.salaryRange) {
      case (?(min, max)) {
        if (job.salary < min or job.salary > max) { return false };
      };
      case (null) {};
    };
    switch (filters.status) {
      case (?status) {
        if (job.status != status) { return false };
      };
      case (null) {};
    };
    switch (filters.keyword) {
      case (?keyword) {
        let lowerKeyword = keyword.toLower();
        let titleMatch = job.title.toLower().contains(#text lowerKeyword);
        let descMatch = job.description.toLower().contains(#text lowerKeyword);
        if (not (titleMatch or descMatch)) { return false };
      };
      case (null) {};
    };
    true;
  };

  // List filtered jobs (Public sees published, Employer sees own, Admin sees all matching)
  public query ({ caller }) func listFilteredJobs(filters : JobFilters) : async [JobPosting] {
    let allJobs = jobs.values().toArray();
    let filtered = allJobs.filter(
      func(job) {
        if (not matchesFilters(filters, job)) {
          return false;
        };

        // Public can see published jobs
        switch (job.status) {
          case (#published) { return true };
          case (_) {};
        };

        // Authenticated users
        if (AccessControl.hasPermission(accessControlState, caller, #user)) {
          // Employers can see their own jobs (any status)
          if (isEmployer(caller) and job.employerId == caller) {
            return true;
          };
          // Admin can see all
          if (isAppAdmin(caller)) {
            return true;
          };
        };

        false;
      },
    );
    filtered;
  };

  // Profile Management

  type CandidateProfileInput = {
    name : Text;
    resume : ?Text;
    skills : [Text];
    experience : Text;
    email : Text;
  };

  // Initialize/Update Candidate Profile (Candidate only, or Admin)
  public shared ({ caller }) func saveCandidateProfile(profile : CandidateProfileInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    if (not isCandidate(caller) and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Only candidates can save candidate profiles");
    };

    let newProfile : CandidateProfile = {
      userId = caller;
      name = profile.name;
      resume = profile.resume;
      skills = profile.skills;
      experience = profile.experience;
      email = profile.email;
    };
    candidateProfiles.add(caller, newProfile);
  };

  // Get Candidate Profile (Own profile, or Admin)
  public query ({ caller }) func getCandidateProfile(userId : Principal) : async ?CandidateProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };
    if (caller != userId and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    candidateProfiles.get(userId);
  };

  type EmployerProfileInput = {
    companyName : Text;
    companyDescription : Text;
    companyLocation : Text;
    email : Text;
  };

  // Initialize/Update Employer Profile (Employer only, or Admin)
  public shared ({ caller }) func saveEmployerProfile(profile : EmployerProfileInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    if (not isEmployer(caller) and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Only employers can save employer profiles");
    };

    let newProfile : EmployerProfile = {
      userId = caller;
      companyName = profile.companyName;
      companyDescription = profile.companyDescription;
      companyLocation = profile.companyLocation;
      email = profile.email;
    };
    employerProfiles.add(caller, newProfile);
  };

  // Get Employer Profile (Own profile, or Admin)
  public query ({ caller }) func getEmployerProfile(userId : Principal) : async ?EmployerProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };
    if (caller != userId and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    employerProfiles.get(userId);
  };

  // Application Management

  // Apply for a job (Candidate only)
  public shared ({ caller }) func applyForJob(jobId : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can apply");
    };
    if (not isCandidate(caller)) {
      Runtime.trap("Unauthorized: Only candidates can apply for jobs");
    };

    // Check job exists and is published
    let job = switch (jobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) { job };
    };

    switch (job.status) {
      case (#published) {};
      case (_) { Runtime.trap("Can only apply to published jobs") };
    };

    // Check for duplicate application (unique job_id, candidate_id)
    let existingApplications = applications.values().toArray();
    for (app in existingApplications.vals()) {
      if (app.jobId == jobId and app.candidateId == caller) {
        Runtime.trap("Already applied to this job");
      };
    };

    let applicationId = nextApplicationId;
    nextApplicationId += 1;
    let now = Time.now();

    let newApplication : Application = {
      id = applicationId;
      jobId = jobId;
      candidateId = caller;
      status = #applied;
      appliedAt = now;
    };

    applications.add(applicationId, newApplication);
    applicationId;
  };

  // Update Application Status (Employer who owns the job, or Admin)
  public shared ({ caller }) func updateApplicationStatus(applicationId : Nat, newStatus : ApplicationStatusType) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update applications");
    };

    let application = switch (applications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) { app };
    };

    let job = switch (jobs.get(application.jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) { job };
    };

    // Only employer who owns the job or admin can update
    if (job.employerId != caller and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only update applications for your own jobs");
    };

    let updatedApplication : Application = {
      application with status = newStatus;
    };

    applications.add(applicationId, updatedApplication);
  };

  // Get Application (Candidate who owns it, Employer who owns the job, or Admin)
  public query ({ caller }) func getApplication(applicationId : Nat) : async ?Application {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view applications");
    };

    let application = switch (applications.get(applicationId)) {
      case (null) { return null };
      case (?app) { app };
    };

    // Candidate can read their own applications
    if (application.candidateId == caller) {
      return ?application;
    };

    // Employer can read applications for jobs they own
    let job = switch (jobs.get(application.jobId)) {
      case (null) { return null };
      case (?job) { job };
    };

    if (isEmployer(caller) and job.employerId == caller) {
      return ?application;
    };

    // Admin can read all
    if (isAppAdmin(caller)) {
      return ?application;
    };

    null;
  };

  // List Candidate's Applications (Candidate for own, Admin for all)
  public query ({ caller }) func listCandidateApplications(candidateId : Principal) : async [Application] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view applications");
    };
    if (caller != candidateId and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only view your own applications");
    };

    let allApplications = applications.values().toArray();
    allApplications.filter<Application>(func(app) { app.candidateId == candidateId });
  };

  // List Applications for a Job (Employer who owns the job, or Admin)
  public query ({ caller }) func listJobApplications(jobId : Nat) : async [Application] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view applications");
    };

    let job = switch (jobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) { job };
    };

    // Only employer who owns the job or admin can list
    if (job.employerId != caller and not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only view applications for your own jobs");
    };

    let allApplications = applications.values().toArray();
    allApplications.filter<Application>(func(app) { app.jobId == jobId });
  };

  // Admin Functions

  // List all jobs (Admin only)
  public query ({ caller }) func listAllJobs() : async [JobPosting] {
    if (not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view all jobs");
    };
    jobs.values().toArray();
  };

  // List all candidates (Admin only)
  public query ({ caller }) func listAllCandidates() : async [CandidateProfile] {
    if (not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view all candidates");
    };
    candidateProfiles.values().toArray();
  };

  // List all employers (Admin only)
  public query ({ caller }) func listAllEmployers() : async [EmployerProfile] {
    if (not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view all employers");
    };
    employerProfiles.values().toArray();
  };

  // List all applications (Admin only)
  public query ({ caller }) func listAllApplications() : async [Application] {
    if (not isAppAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view all applications");
    };
    applications.values().toArray();
  };
};
