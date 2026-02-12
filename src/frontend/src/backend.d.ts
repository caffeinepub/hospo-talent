import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    appRole: AppRole;
    name: string;
    email: string;
}
export interface Application {
    id: bigint;
    status: ApplicationStatusType;
    appliedAt: bigint;
    jobId: bigint;
    candidateId: Principal;
}
export interface JobInput {
    status: JobStatus;
    title: string;
    salary: bigint;
    jobType: JobType;
    slug: string;
    description: string;
    location: string;
}
export interface CandidateProfileInput {
    resume?: string;
    name: string;
    email: string;
    experience: string;
    skills: Array<string>;
}
export interface JobPosting {
    id: bigint;
    status: JobStatus;
    title: string;
    created: bigint;
    modified: bigint;
    salary: bigint;
    jobType: JobType;
    slug: string;
    description: string;
    employerId: Principal;
    location: string;
}
export interface EmployerProfileInput {
    companyLocation: string;
    email: string;
    companyName: string;
    companyDescription: string;
}
export interface CandidateProfile {
    resume?: string;
    userId: Principal;
    name: string;
    email: string;
    experience: string;
    skills: Array<string>;
}
export interface JobFilters {
    status?: JobStatus;
    jobType?: JobType;
    keyword?: string;
    salaryRange?: [bigint, bigint];
    location?: string;
}
export interface EmployerProfile {
    userId: Principal;
    companyLocation: string;
    email: string;
    companyName: string;
    companyDescription: string;
}
export enum AppRole {
    admin = "admin",
    employer = "employer",
    candidate = "candidate"
}
export enum ApplicationStatusType {
    hired = "hired",
    interview = "interview",
    applied = "applied",
    rejected = "rejected",
    shortlisted = "shortlisted"
}
export enum JobStatus {
    closed = "closed",
    published = "published",
    draft = "draft"
}
export enum JobType {
    contract = "contract",
    partTime = "partTime",
    fullTime = "fullTime",
    freelance = "freelance"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    applyForJob(jobId: bigint): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteJob(jobId: bigint): Promise<void>;
    getApplication(applicationId: bigint): Promise<Application | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCandidateProfile(userId: Principal): Promise<CandidateProfile | null>;
    getEmployerProfile(userId: Principal): Promise<EmployerProfile | null>;
    getJob(jobId: bigint): Promise<JobPosting | null>;
    getJobBySlug(slug: string): Promise<JobPosting | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllApplications(): Promise<Array<Application>>;
    listAllCandidates(): Promise<Array<CandidateProfile>>;
    listAllEmployers(): Promise<Array<EmployerProfile>>;
    listAllJobs(): Promise<Array<JobPosting>>;
    listCandidateApplications(candidateId: Principal): Promise<Array<Application>>;
    listFilteredJobs(filters: JobFilters): Promise<Array<JobPosting>>;
    listJobApplications(jobId: bigint): Promise<Array<Application>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCandidateProfile(profile: CandidateProfileInput): Promise<void>;
    saveEmployerProfile(profile: EmployerProfileInput): Promise<void>;
    saveJob(jobInput: JobInput): Promise<bigint>;
    updateApplicationStatus(applicationId: bigint, newStatus: ApplicationStatusType): Promise<void>;
    updateJob(jobId: bigint, jobInput: JobInput): Promise<void>;
}
