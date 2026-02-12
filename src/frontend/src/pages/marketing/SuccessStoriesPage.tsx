import { useSEO } from '../../lib/seo';
import { Star } from 'lucide-react';

export default function SuccessStoriesPage() {
  useSEO({
    title: 'Success Stories',
    description: 'Read success stories from hospitality professionals who found their perfect role through HOSPO TALENT.',
  });

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Head Chef',
      location: 'London',
      rating: 5,
      text: 'HOSPO TALENT helped me find my dream role at a Michelin-starred restaurant. The process was seamless and professional.',
    },
    {
      name: 'James Thompson',
      role: 'Restaurant Manager',
      location: 'Manchester',
      rating: 5,
      text: 'As an employer, I\'ve found exceptional talent through this platform. The quality of candidates is outstanding.',
    },
    {
      name: 'Emily Roberts',
      role: 'Sommelier',
      location: 'Edinburgh',
      rating: 5,
      text: 'I was able to find a position that perfectly matched my skills and career goals. Highly recommended!',
    },
  ];

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="font-heading text-5xl font-bold text-center mb-6">
          Success <span className="text-emphasis">Stories</span>
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Hear from hospitality professionals who found their perfect match through HOSPO TALENT
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border-100 rounded-card p-6 premium-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary-purple text-primary-purple" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
