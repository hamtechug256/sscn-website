import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = './public/uploads/carousel';

async function generateImages() {
  console.log('🎨 Generating Ugandan-context images for SSCN Website...\n');
  
  const zai = await ZAI.create();

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const images = [
    {
      prompt: "Professional African nursing students in white medical uniforms attending a nursing school classroom in Uganda East Africa, diverse black African students learning healthcare, modern classroom with medical equipment, high quality professional photo, realistic",
      filename: 'hero-1.png',
      size: '1344x768' as const
    },
    {
      prompt: "African nurses in hospital setting caring for patients in Uganda, black healthcare professionals in white uniforms, modern hospital ward, compassionate care, East African medical facility, professional healthcare photography",
      filename: 'hero-2.png',
      size: '1344x768' as const
    },
    {
      prompt: "African nursing students practicing clinical skills with medical mannequins in training lab, black students in nursing uniforms, hands-on medical education, Uganda nursing school, professional training environment",
      filename: 'hero-3.png',
      size: '1344x768' as const
    },
    {
      prompt: "Graduation ceremony of African nursing students in Uganda, black graduates in nursing caps and uniforms, celebrating achievement, academic success, East African education, joyful moment",
      filename: 'hero-4.png',
      size: '1344x768' as const
    },
    {
      prompt: "African community health outreach, black nurses providing healthcare services in rural Uganda village, community engagement, public health education, compassionate healthcare workers, East Africa",
      filename: 'hero-5.png',
      size: '1344x768' as const
    }
  ];

  const results = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    console.log(`📸 Generating image ${i + 1}/${images.length}: ${img.filename}`);
    
    try {
      const response = await zai.images.generations.create({
        prompt: img.prompt,
        size: img.size
      });

      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      const outputPath = path.join(outputDir, img.filename);
      
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`   ✅ Saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)\n`);
      
      results.push({
        success: true,
        filename: img.filename,
        path: outputPath,
        size: buffer.length
      });
    } catch (error: any) {
      console.error(`   ❌ Failed: ${error.message}\n`);
      results.push({
        success: false,
        filename: img.filename,
        error: error.message
      });
    }
  }

  // Summary
  const successful = results.filter(r => r.success);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Successfully generated ${successful.length}/${images.length} images`);
  console.log(`📁 Output directory: ${path.resolve(outputDir)}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return results;
}

generateImages().catch(console.error);
