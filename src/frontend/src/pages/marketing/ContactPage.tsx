import { useSEO } from '../../lib/seo';
import { Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with the HOSPO TALENT team.',
  });

  return (
    <div className="section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="font-heading text-5xl font-bold text-center mb-6">
          Let's Have a <span className="text-emphasis">Chat</span>
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          We're here to help. Reach out to us with any questions or feedback.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border-100 rounded-card p-8 text-center premium-shadow">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary-purple" />
            <h3 className="font-heading text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">
              For general inquiries and support
            </p>
            <a href="mailto:hello@hospotalent.co.uk" className="text-primary-purple hover:underline">
              hello@hospotalent.co.uk
            </a>
          </div>

          <div className="bg-card border border-border-100 rounded-card p-8 text-center premium-shadow">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary-purple" />
            <h3 className="font-heading text-xl font-semibold mb-2">Support</h3>
            <p className="text-muted-foreground mb-4">
              Need help with your account?
            </p>
            <a href="mailto:support@hospotalent.co.uk" className="text-primary-purple hover:underline">
              support@hospotalent.co.uk
            </a>
          </div>
        </div>

        <div className="mt-12 bg-surface-50 rounded-card p-8">
          <h3 className="font-heading text-2xl font-semibold mb-4">Office Hours</h3>
          <p className="text-muted-foreground">
            Monday - Friday: 9:00 AM - 6:00 PM GMT<br />
            Saturday - Sunday: Closed
          </p>
          <p className="text-muted-foreground mt-4">
            We aim to respond to all inquiries within 24 hours during business days.
          </p>
        </div>
      </div>
    </div>
  );
}
