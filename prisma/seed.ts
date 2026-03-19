import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // Create Site Settings
  const settingsData = [
    { key: 'siteName', value: 'Soroti School of Comprehensive Nursing', type: 'text', category: 'general' },
    { key: 'tagline', value: 'Excellence in Healthcare Education Since 1970', type: 'text', category: 'general' },
    { key: 'description', value: 'Leading nursing and midwifery training institution in Eastern Uganda, producing skilled healthcare professionals for over 50 years.', type: 'text', category: 'general' },
    { key: 'address', value: 'Soroti City, Teso Sub-region, Eastern Uganda', type: 'text', category: 'contact' },
    { key: 'phone', value: '+256 393 249195', type: 'text', category: 'contact' },
    { key: 'email', value: 'info@sscn.ac.ug', type: 'text', category: 'contact' },
    { key: 'website', value: 'https://sscn.ac.ug', type: 'text', category: 'contact' },
    { key: 'socialFacebook', value: 'https://facebook.com/sscnuganda', type: 'text', category: 'social' },
    { key: 'socialTwitter', value: 'https://twitter.com/sscnuganda', type: 'text', category: 'social' },
    { key: 'socialLinkedin', value: 'https://linkedin.com/school/sscn', type: 'text', category: 'social' },
    { key: 'logo', value: '/uploads/logo.png', type: 'image', category: 'branding' },
    { key: 'heroImage', value: '/uploads/carousel/hero-1.jpg', type: 'image', category: 'branding' }
  ];

  for (const setting of settingsData) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting
    });
  }
  console.log('✅ Site settings created');

  // Create Programs
  const programs = await Promise.all([
    prisma.program.upsert({
      where: { slug: 'diploma-nursing' },
      update: {},
      create: {
        name: 'Diploma in Nursing',
        slug: 'diploma-nursing',
        code: 'DN',
        level: 'diploma',
        description: 'Comprehensive training in patient care, medical administration, and clinical practice. Prepare to serve in hospitals and health centers across Uganda with hands-on experience in Soroti Regional Referral Hospital.',
        duration: '3 Years',
        durationYears: 3,
        requirements: JSON.stringify([
          'Uganda Certificate of Education (UCE) with at least 5 passes including English, Mathematics, Biology, Chemistry, and Physics',
          'Uganda Advanced Certificate of Education (UACE) with at least one principal pass in Biology'
        ]),
        image: '/uploads/programs/nursing-program.jpg',
        features: JSON.stringify(['Clinical Rotations', 'Lab Training', 'Community Health']),
        intake: 'January, September',
        mode: 'Full-time',
        fees: 'UGX 1,200,000 per semester',
        featured: true,
        order: 1
      }
    }),
    prisma.program.upsert({
      where: { slug: 'diploma-midwifery' },
      update: {},
      create: {
        name: 'Diploma in Midwifery',
        slug: 'diploma-midwifery',
        code: 'DM',
        level: 'diploma',
        description: 'Specialized training in maternal and child health. Learn to provide quality antenatal, delivery, and postnatal care to mothers and newborns. Includes extensive clinical rotation in maternity wards.',
        duration: '3 Years',
        durationYears: 3,
        requirements: JSON.stringify([
          'UCE with at least 5 passes including English, Mathematics, Biology, Chemistry, and Physics',
          'UACE with at least one principal pass in Biology',
          'Passion for maternal and child health'
        ]),
        image: '/uploads/programs/midwifery-program.jpg',
        features: JSON.stringify(['Delivery Training', 'Prenatal Care', 'Neonatal Care']),
        intake: 'January, September',
        mode: 'Full-time',
        fees: 'UGX 1,200,000 per semester',
        featured: true,
        order: 2
      }
    }),
    prisma.program.upsert({
      where: { slug: 'nursing-extension' },
      update: {},
      create: {
        name: 'Nursing Extension Program',
        slug: 'nursing-extension',
        code: 'NEP',
        level: 'diploma',
        description: 'Upgrade program for practicing enrolled nurses. Flexible weekend classes designed for working healthcare professionals who want to advance their careers to diploma level.',
        duration: '2 Years',
        durationYears: 2,
        requirements: JSON.stringify([
          'Certificate in Nursing or Enrolled Nurse qualification',
          'Currently employed in a healthcare setting',
          'Letter of recommendation from employer'
        ]),
        image: '/uploads/carousel/hero-3.jpg',
        features: JSON.stringify(['Flexible Schedule', 'Weekend Classes', 'Practical Focus']),
        intake: 'January',
        mode: 'Part-time',
        fees: 'UGX 800,000 per semester',
        featured: true,
        order: 3
      }
    }),
    prisma.program.upsert({
      where: { slug: 'elearning-nursing' },
      update: {},
      create: {
        name: 'E-Learning Programs',
        slug: 'elearning-nursing',
        code: 'ELN',
        level: 'diploma',
        description: 'Distance learning options for students across Uganda. Access quality nursing education from anywhere with internet connectivity. Ideal for students in remote areas.',
        duration: 'Flexible',
        requirements: JSON.stringify([
          'Standard program requirements',
          'Reliable internet access',
          'Computer literacy',
          'Self-discipline for independent study'
        ]),
        image: '/uploads/programs/public-health.jpg',
        features: JSON.stringify(['Online Classes', 'Self-Paced', '24/7 Resources']),
        mode: 'E-Learning',
        fees: 'UGX 600,000 per semester',
        featured: false,
        order: 4
      }
    })
  ]);
  console.log('✅ Programs created:', programs.length);

  // Create News Articles
  const news = await Promise.all([
    prisma.news.upsert({
      where: { slug: 'september-2025-intake-applications-open' },
      update: {},
      create: {
        title: 'September 2025 Intake Applications Now Open',
        slug: 'september-2025-intake-applications-open',
        content: `<p>The Soroti School of Comprehensive Nursing is pleased to announce that applications for the September 2025 intake are now open. This is an excellent opportunity for aspiring healthcare professionals to join one of Uganda's leading nursing and midwifery training institutions.</p>
<p><strong>Applications are being accepted for:</strong></p>
<ul>
<li>Diploma in Nursing (3 years)</li>
<li>Diploma in Midwifery (3 years)</li>
<li>Nursing Extension Program (2 years)</li>
</ul>
<p>To apply, visit our admissions office at Soroti City or download the application form from our website. The deadline for applications is August 15, 2025.</p>
<p>For more information, contact our admissions team at +256 393 249195 or email info@sscn.ac.ug.</p>`,
        excerpt: 'Apply now for our September 2025 intake. Diploma programs in Nursing and Midwifery available.',
        image: '/uploads/carousel/hero-1.jpg',
        category: 'admission',
        published: true,
        featured: true
      }
    }),
    prisma.news.upsert({
      where: { slug: 'sscn-students-excel-unmeb-exams' },
      update: {},
      create: {
        title: 'SSCN Students Excel in UNMEB Examinations',
        slug: 'sscn-students-excel-unmeb-exams',
        content: `<p>We are proud to announce that SSCN students have achieved outstanding results in the recent Uganda Nurses and Midwives Examination Board (UNMEB) examinations. Our institution recorded a 95% pass rate, with several students scoring distinctions.</p>
<p>The Principal, tutors, and staff congratulate all students who sat for the examinations. This achievement reflects our commitment to quality healthcare education and the dedication of both students and faculty.</p>
<p><strong>Special recognition goes to:</strong></p>
<ul>
<li>Best Nursing Student: Akello Grace (Distinction)</li>
<li>Best Midwifery Student: Okello James (Distinction)</li>
</ul>
<p>We thank our clinical partners at Soroti Regional Referral Hospital for their continued support in providing excellent practical training.</p>`,
        excerpt: 'SSCN achieves 95% pass rate in UNMEB examinations with several distinctions.',
        image: '/uploads/gallery/graduation.jpg',
        category: 'achievement',
        published: true,
        featured: true
      }
    }),
    prisma.news.upsert({
      where: { slug: 'new-skills-lab-equipment-commissioned' },
      update: {},
      create: {
        title: 'New Skills Laboratory Equipment Commissioned',
        slug: 'new-skills-lab-equipment-commissioned',
        content: `<p>The Soroti School of Comprehensive Nursing has commissioned new state-of-the-art equipment for our skills laboratory. This investment enhances our practical training capabilities and ensures students receive hands-on experience with modern medical equipment.</p>
<p><strong>The new equipment includes:</strong></p>
<ul>
<li>Advanced patient simulation mannequins</li>
<li>Modern delivery models for midwifery training</li>
<li>Updated nursing procedure equipment</li>
<li>CPR training mannequins</li>
</ul>
<p>This development is part of our continuous effort to provide quality healthcare education that meets international standards. We thank the Ministry of Education and our development partners for their support.</p>`,
        excerpt: 'State-of-the-art skills laboratory equipment commissioned to enhance practical training.',
        image: '/uploads/gallery/clinical-lab.jpg',
        category: 'general',
        published: true,
        featured: false
      }
    })
  ]);
  console.log('✅ News articles created:', news.length);

  // Create Events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { slug: 'white-coat-ceremony-2025' },
      update: {},
      create: {
        title: 'White Coat Ceremony 2025',
        slug: 'white-coat-ceremony-2025',
        description: 'The annual White Coat Ceremony marks the formal entry of new nursing and midwifery students into the healthcare profession.',
        content: 'All first-year students are required to attend. Parents and guardians are welcome to witness this significant milestone.',
        location: 'SSCN Main Hall, Soroti City',
        date: new Date('2025-02-15T09:00:00'),
        endDate: new Date('2025-02-15T13:00:00'),
        time: '9:00 AM - 1:00 PM',
        image: '/uploads/gallery/graduation.jpg',
        category: 'ceremony',
        featured: true
      }
    }),
    prisma.event.upsert({
      where: { slug: 'community-outreach-katakwi-2025' },
      update: {},
      create: {
        title: 'Community Health Outreach - Katakwi District',
        slug: 'community-outreach-katakwi-2025',
        description: 'Our annual community health outreach program in Katakwi District. Students and staff will provide free health screenings and health education.',
        content: 'This is a mandatory activity for Year 2 and Year 3 students. Transportation will be provided from the school.',
        location: 'Katakwi District, Teso Sub-region',
        date: new Date('2025-03-20T07:00:00'),
        endDate: new Date('2025-03-22T18:00:00'),
        time: '3-day program',
        image: '/uploads/gallery/community-health.jpg',
        category: 'academic',
        featured: true
      }
    }),
    prisma.event.upsert({
      where: { slug: 'unmeb-examination-period-2025' },
      update: {},
      create: {
        title: 'UNMEB Examination Period',
        slug: 'unmeb-examination-period-2025',
        description: 'Uganda Nurses and Midwives Examination Board final examinations for all diploma students.',
        content: 'Examination timetables will be provided by the examinations office. Students should report any issues to the Academic Registrar.',
        location: 'SSCN Examination Halls',
        date: new Date('2025-05-05T08:00:00'),
        endDate: new Date('2025-05-16T17:00:00'),
        time: '8:00 AM - 5:00 PM',
        image: '/uploads/carousel/hero-4.jpg',
        category: 'academic',
        featured: false
      }
    })
  ]);
  console.log('✅ Events created:', events.length);

  // Create Gallery Album and Images
  const album = await prisma.galleryAlbum.upsert({
    where: { slug: 'campus-life' },
    update: {},
    create: {
      title: 'Campus Life',
      slug: 'campus-life',
      description: 'Life at Soroti School of Comprehensive Nursing',
      coverImage: '/uploads/gallery/nursing-training.jpg',
      category: 'campus',
      featured: true
    }
  });

  // Check if images already exist for this album
  const existingImages = await prisma.galleryImage.findMany({
    where: { albumId: album.id }
  });

  if (existingImages.length === 0) {
    const galleryImages = await Promise.all([
      prisma.galleryImage.create({
        data: {
          albumId: album.id,
          url: '/uploads/gallery/nursing-training.jpg',
          caption: 'Nursing Skills Training',
          order: 1
        }
      }),
      prisma.galleryImage.create({
        data: {
          albumId: album.id,
          url: '/uploads/gallery/clinical-lab.jpg',
          caption: 'Clinical Laboratory Sessions',
          order: 2
        }
      }),
      prisma.galleryImage.create({
        data: {
          albumId: album.id,
          url: '/uploads/gallery/midwifery-care.jpg',
          caption: 'Midwifery Care Training',
          order: 3
        }
      }),
      prisma.galleryImage.create({
        data: {
          albumId: album.id,
          url: '/uploads/gallery/community-health.jpg',
          caption: 'Community Health Outreach',
          order: 4
        }
      }),
      prisma.galleryImage.create({
        data: {
          albumId: album.id,
          url: '/uploads/gallery/graduation.jpg',
          caption: 'Graduation Ceremony',
          order: 5
        }
      })
    ]);
    console.log('✅ Gallery album and images created:', galleryImages.length);
  } else {
    console.log('✅ Gallery album exists with', existingImages.length, 'images');
  }

  // Create Faculty Members
  const faculty = await Promise.all([
    prisma.faculty.create({
      data: {
        name: 'Mrs. Amongin Beatrice',
        title: 'Principal',
        department: 'Administration',
        bio: 'Experienced nursing educator with over 25 years in healthcare education. Leading SSCN towards excellence in nursing and midwifery training.',
        image: '/uploads/faculty/placeholder.jpg',
        email: 'principal@sscn.ac.ug',
        qualifications: JSON.stringify(['MSc Nursing', 'BSc Nursing', 'Diploma in Nursing Education']),
        specializations: JSON.stringify(['Nursing Administration', 'Healthcare Management']),
        order: 1
      }
    }),
    prisma.faculty.create({
      data: {
        name: 'Mr. Okello Peter',
        title: 'Deputy Principal',
        department: 'Administration',
        bio: 'Oversees academic programs and student affairs. Passionate about quality healthcare education.',
        image: '/uploads/faculty/placeholder.jpg',
        email: 'deputy@sscn.ac.ug',
        qualifications: JSON.stringify(['MSc Nursing Education', 'BSc Nursing']),
        specializations: JSON.stringify(['Nursing Education', 'Curriculum Development']),
        order: 2
      }
    }),
    prisma.faculty.create({
      data: {
        name: 'Ms. Auma Grace',
        title: 'Senior Tutor - Nursing',
        department: 'Nursing Department',
        bio: 'Specializes in medical-surgical nursing and clinical instruction. UNMEB examiner.',
        image: '/uploads/faculty/placeholder.jpg',
        email: 'nursing@sscn.ac.ug',
        qualifications: JSON.stringify(['MSc Medical-Surgical Nursing', 'BSc Nursing']),
        specializations: JSON.stringify(['Medical-Surgical Nursing', 'Critical Care']),
        order: 3
      }
    }),
    prisma.faculty.create({
      data: {
        name: 'Mrs. Adongo Sarah',
        title: 'Senior Tutor - Midwifery',
        department: 'Midwifery Department',
        bio: 'Expert in maternal and child health with extensive clinical experience. Coordinates midwifery training programs.',
        image: '/uploads/faculty/placeholder.jpg',
        email: 'midwifery@sscn.ac.ug',
        qualifications: JSON.stringify(['MSc Midwifery', 'BSc Nursing', 'Diploma in Midwifery']),
        specializations: JSON.stringify(['Maternal Health', 'Neonatal Care', 'High-Risk Obstetrics']),
        order: 4
      }
    }),
    prisma.faculty.create({
      data: {
        name: 'Mr. Erijagu David',
        title: 'Clinical Coordinator',
        department: 'Clinical Training',
        bio: 'Coordinates student clinical placements at Soroti Regional Referral Hospital and other health facilities.',
        image: '/uploads/faculty/placeholder.jpg',
        email: 'clinical@sscn.ac.ug',
        qualifications: JSON.stringify(['BSc Nursing', 'Diploma in Clinical Instruction']),
        specializations: JSON.stringify(['Clinical Supervision', 'Skills Training']),
        order: 5
      }
    })
  ]);
  console.log('✅ Faculty members created:', faculty.length);

  // Create Downloads
  const downloads = await Promise.all([
    prisma.download.create({
      data: {
        title: 'Application Form - Diploma Programs',
        description: 'Official application form for Diploma in Nursing and Midwifery programs',
        file: '/uploads/downloads/application-form.pdf',
        fileType: 'pdf',
        category: 'forms'
      }
    }),
    prisma.download.create({
      data: {
        title: 'Student Handbook 2025',
        description: 'Comprehensive guide for SSCN students covering policies, procedures, and academic information',
        file: '/uploads/downloads/student-handbook.pdf',
        fileType: 'pdf',
        category: 'policies'
      }
    }),
    prisma.download.create({
      data: {
        title: 'Fee Structure 2025',
        description: 'Current tuition and fees for all programs at SSCN',
        file: '/uploads/downloads/fee-structure.pdf',
        fileType: 'pdf',
        category: 'forms'
      }
    }),
    prisma.download.create({
      data: {
        title: 'Academic Calendar 2025',
        description: 'Official academic calendar with important dates, examinations, and holidays',
        file: '/uploads/downloads/academic-calendar.pdf',
        fileType: 'pdf',
        category: 'policies'
      }
    })
  ]);
  console.log('✅ Downloads created:', downloads.length);

  // Create FAQs
  const faqs = await Promise.all([
    prisma.fAQ.create({
      data: {
        question: 'What are the admission requirements for nursing programs?',
        answer: 'Applicants need Uganda Certificate of Education (UCE) with at least 5 passes including English, Mathematics, Biology, Chemistry, and Physics. Additionally, Uganda Advanced Certificate of Education (UACE) with at least one principal pass in Biology is required for diploma programs.',
        category: 'admission',
        order: 1,
        active: true
      }
    }),
    prisma.fAQ.create({
      data: {
        question: 'How long does it take to complete the nursing diploma?',
        answer: 'The Diploma in Nursing is a 3-year program that includes theoretical instruction, laboratory practice, and clinical rotations at affiliated hospitals and health centers.',
        category: 'general',
        order: 2,
        active: true
      }
    }),
    prisma.fAQ.create({
      data: {
        question: 'What clinical facilities are available for training?',
        answer: 'SSCN has partnerships with Soroti Regional Referral Hospital, various Health Center IVs, and community health facilities. Our modern skills laboratory also provides hands-on training with simulation equipment.',
        category: 'general',
        order: 3,
        active: true
      }
    }),
    prisma.fAQ.create({
      data: {
        question: 'Is accommodation available for students?',
        answer: 'Yes, SSCN provides on-campus hostel accommodation for both male and female students. The hostels are secure and provide a conducive environment for studying.',
        category: 'general',
        order: 4,
        active: true
      }
    }),
    prisma.fAQ.create({
      data: {
        question: 'What are the career opportunities after graduation?',
        answer: 'Graduates can work in hospitals, health centers, NGOs, and private healthcare facilities across Uganda and internationally. Many pursue further education to specialize in areas like critical care, pediatrics, or community health.',
        category: 'general',
        order: 5,
        active: true
      }
    }),
    prisma.fAQ.create({
      data: {
        question: 'How can I apply for the program?',
        answer: 'You can apply by visiting our admissions office in Soroti City, downloading the application form from our website, or applying online during the application period. The main intakes are in January and September each year.',
        category: 'admission',
        order: 6,
        active: true
      }
    })
  ]);
  console.log('✅ FAQs created:', faqs.length);

  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sscn.ac.ug' },
    update: {},
    create: {
      email: 'admin@sscn.ac.ug',
      password: '$2a$10$K9LJ7yVqMqPBzWVNZYvGJuJQvJ8WmX6Z.u3PKxGvE9YfHyKHPGh6m', // password: admin123
      name: 'SSCN Administrator',
      role: 'admin',
      active: true
    }
  });
  console.log('✅ Admin user created');

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Database seeding completed successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📋 Login credentials:');
  console.log('   Email: admin@sscn.ac.ug');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
