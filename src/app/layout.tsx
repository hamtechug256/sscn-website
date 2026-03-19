import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SSCN | Nursing & Midwifery School in Soroti, Uganda",
    template: "%s | SSCN - Soroti School of Comprehensive Nursing",
  },
  description: "Start your nursing or midwifery career at SSCN in Soroti, Uganda. We offer diploma programs with modern labs, expert faculty, and high graduate success. Apply today!",
  keywords: [
    "Soroti School of Comprehensive Nursing",
    "SSCN",
    "nursing school Uganda",
    "midwifery training",
    "healthcare education",
    "nursing diploma",
    "midwifery diploma",
    "Soroti City",
    "Eastern Uganda",
    "nursing career Uganda",
    "comprehensive nursing",
    "registered nursing Uganda",
    "nursing extension program",
    "e-learning nursing Uganda"
  ],
  authors: [{ name: "SSCN - Soroti School of Comprehensive Nursing" }],
  creator: "SSCN",
  publisher: "Soroti School of Comprehensive Nursing",
  metadataBase: new URL("https://sscnug.netlify.app"),
  verification: {
    google: "QR1HBf3n-p82L2s8USU-kpiWPTDgnhcuwAyfjbOwXe8",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "512x512" }],
  },
  openGraph: {
    title: "SSCN | Nursing & Midwifery School in Soroti, Uganda",
    description: "Start your nursing or midwifery career at SSCN in Soroti, Uganda. We offer diploma programs with modern labs, expert faculty, and high graduate success.",
    url: "https://sscnug.netlify.app",
    siteName: "SSCN - Soroti School of Comprehensive Nursing",
    type: "website",
    locale: "en_UG",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soroti School of Comprehensive Nursing - Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SSCN | Nursing & Midwifery School in Soroti, Uganda",
    description: "Start your nursing or midwifery career at SSCN in Soroti, Uganda. Diploma programs with modern labs and expert faculty.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sscnug.netlify.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Soroti School of Comprehensive Nursing",
              alternateName: "SSCN",
              url: "https://sscnug.netlify.app",
              logo: "https://sscnug.netlify.app/images/school-badge.png",
              description: "Start your nursing or midwifery career at SSCN in Soroti, Uganda. We offer diploma programs with modern labs, expert faculty, and high graduate success.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+256-393-249195",
                contactType: "Admissions",
                email: "sscn16@gmail.com",
                availableLanguage: ["English"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Near Soroti Regional Referral Hospital",
                addressLocality: "Soroti City",
                addressRegion: "Eastern Region",
                addressCountry: "UG",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "1.7155",
                longitude: "33.6123",
              },
              sameAs: [
                "https://www.facebook.com/sorotinursing",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Academic Programs",
                itemListElement: [
                  {
                    "@type": "Course",
                    name: "Diploma in Nursing",
                    description: "Comprehensive training in patient care, medical administration, and clinical practice.",
                    provider: {
                      "@type": "EducationalOrganization",
                      name: "Soroti School of Comprehensive Nursing",
                    },
                  },
                  {
                    "@type": "Course",
                    name: "Diploma in Midwifery",
                    description: "Specialized training in maternal and child health.",
                    provider: {
                      "@type": "EducationalOrganization",
                      name: "Soroti School of Comprehensive Nursing",
                    },
                  },
                  {
                    "@type": "Course",
                    name: "Diploma in Nursing (Extension)",
                    description: "Extension program for practicing nurses to upgrade their qualifications.",
                    provider: {
                      "@type": "EducationalOrganization",
                      name: "Soroti School of Comprehensive Nursing",
                    },
                  },
                  {
                    "@type": "Course",
                    name: "Diploma in Midwifery (Extension)",
                    description: "Extension program for practicing midwives to upgrade their qualifications.",
                    provider: {
                      "@type": "EducationalOrganization",
                      name: "Soroti School of Comprehensive Nursing",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
