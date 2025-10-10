# GSU AI Club Website

A modern, responsive single-page website for the Georgia State University AI Club, built with Next.js and powered by Sanity CMS for easy content management.

## 🚀 Features

- **Single Page Design**: Smooth scrolling navigation between sections
- **Dynamic Content**: All content managed through Sanity CMS
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **GSU Branding**: Custom color scheme matching GSU's brand identity
- **Modern Stack**: Next.js 15, React 19, TypeScript, and Tailwind CSS

## 📋 Sections

1. **Home**: Hero section with title, subtitle, and background image
2. **Mission**: Organization mission with statistics and description
3. **Events**: Latest 3 events with dates, locations, and descriptions
4. **About Us**: E-Board member profiles with contact information
5. **Contact**: Social media links and contact information

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom GSU branding
- **CMS**: Sanity.io v3
- **Images**: Next.js Image optimization
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gsu-ai-website.git
   cd gsu-ai-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Sanity project details:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Set up Sanity Studio**
   ```bash
   cd studio
   npm install
   npm run dev
   ```
   
   This will start the Sanity Studio at `http://localhost:3333`

5. **Run the development server**
   ```bash
   # In the root directory
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Sanity CMS Setup

### Creating a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create a new project
2. Choose "Create project from template" or start blank
3. Note your Project ID and Dataset name
4. Add these to your `.env.local` file

### Schema Types

The project includes 5 schema types:

- **Home**: Main hero section content
- **Mission**: Mission statement and statistics  
- **Event**: Event information with date, location, description
- **Board Member**: E-board member profiles
- **Contact**: Social media and contact links

### Content Management

1. Access Sanity Studio at `http://localhost:3333` (when running locally)
2. Create your content documents:
   - One **Home** document for the hero section
   - One **Mission** document for the mission section
   - Multiple **Event** documents (latest 3 will be shown)
   - Multiple **Board Member** documents for the team
   - One **Contact** document for social links

## 🎨 Customization

### Colors
GSU brand colors are defined in `tailwind.config.js`:
- **GSU Blue**: Primary blue color with variations
- **GSU Gold**: Accent gold color with variations

### Fonts
- **Body**: Inter font family
- **Headings**: Poppins font family

### Layout
All sections can be customized by editing the respective component files in `/src/components/`.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Sanity Studio Deployment

```bash
cd studio
npm run build
npm run deploy
```

## 📂 Project Structure

```
gsu-ai-website/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── HomeSection.tsx
│   │   ├── MissionSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── AboutUsSection.tsx
│   │   └── ContactSection.tsx
│   └── lib/
│       └── sanity.ts
├── studio/
│   ├── schemas/
│   │   ├── home.ts
│   │   ├── mission.ts
│   │   ├── event.ts
│   │   ├── boardMember.ts
│   │   └── contact.ts
│   ├── sanity.config.ts
│   └── package.json
├── tailwind.config.js
├── next.config.js
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the GSU AI Club leadership team
- Join our Discord community

---

Built with ❤️ by the GSU AI Club