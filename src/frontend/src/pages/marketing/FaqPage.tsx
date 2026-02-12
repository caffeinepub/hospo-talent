import { useSEO } from '../../lib/seo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

export default function FaqPage() {
  useSEO({
    title: 'FAQ',
    description: 'Frequently asked questions about HOSPO TALENT - UK hospitality recruitment.',
  });

  const faqs = [
    {
      question: 'How does HOSPO TALENT work?',
      answer: 'HOSPO TALENT connects hospitality professionals with employers across the UK. Job seekers can browse opportunities and apply directly, while employers can post jobs and review applications.',
    },
    {
      question: 'Is HOSPO TALENT free to use?',
      answer: 'Job seekers can browse and apply for jobs completely free. Employers can post jobs and access our talent pool with flexible pricing options.',
    },
    {
      question: 'What types of hospitality roles are available?',
      answer: 'We feature a wide range of roles including chefs, restaurant managers, sommeliers, front-of-house staff, hotel management, and more across all levels of experience.',
    },
    {
      question: 'How do I create a profile?',
      answer: 'Simply sign up using the "Get Started" button, complete your profile information, and upload your CV. You can then start applying for jobs immediately.',
    },
    {
      question: 'Can I apply for multiple jobs?',
      answer: 'Yes! You can apply for as many positions as you like. Each application is tracked in your dashboard for easy management.',
    },
    {
      question: 'How long does the hiring process take?',
      answer: 'The timeline varies by employer, but most candidates hear back within 1-2 weeks of applying. You can track your application status in your dashboard.',
    },
  ];

  return (
    <div className="section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="font-heading text-5xl font-bold text-center mb-6">
          Frequently Asked <span className="text-emphasis">Questions</span>
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Find answers to common questions about HOSPO TALENT
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border-100 rounded-lg px-6">
              <AccordionTrigger className="font-semibold text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
