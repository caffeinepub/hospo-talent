import { useSEO } from '../../lib/seo';

export default function AboutPage() {
  useSEO({
    title: 'About Us',
    description: 'Learn about HOSPO TALENT - the UK\'s premier hospitality recruitment platform.',
  });

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="font-heading text-5xl font-bold mb-6">
          About <span className="text-emphasis">HOSPO TALENT</span>
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            We're dedicated to connecting exceptional hospitality talent with premium opportunities across the United Kingdom.
          </p>
          
          <h2 className="font-heading text-3xl font-bold mt-12 mb-4">Our Mission</h2>
          <p>
            HOSPO TALENT was founded with a simple mission: to revolutionize hospitality recruitment in the UK. 
            We believe that finding the right role or the perfect candidate shouldn't be complicated.
          </p>

          <h2 className="font-heading text-3xl font-bold mt-12 mb-4">UK-First Approach</h2>
          <p>
            We're proud to be a UK-focused platform, understanding the unique needs of the British hospitality 
            sector. From London to Edinburgh, Manchester to Cardiff, we connect talent nationwide.
          </p>

          <h2 className="font-heading text-3xl font-bold mt-12 mb-4">Our Values</h2>
          <ul className="space-y-2">
            <li><strong>Quality:</strong> We prioritize quality matches over quantity</li>
            <li><strong>Transparency:</strong> Clear communication at every step</li>
            <li><strong>Support:</strong> Dedicated assistance for both candidates and employers</li>
            <li><strong>Innovation:</strong> Leveraging technology to improve the recruitment experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
