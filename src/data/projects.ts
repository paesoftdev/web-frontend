export interface Project {
  id: number
  title: string
  category: 'Residential' | 'Commercial' | 'Government' | 'Industrial' | 'Educational'
  type: string
  capacity: string
  image: string
  images?: string[]
  description: string
  location?: string
  dateCompleted?: string
  panelsInstalled?: number
  annualSavings?: string
  co2Reduction?: string
  features?: string[]
  tags?: string[]
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Residential Solar Installation - Quezon City',
    category: 'Residential',
    type: 'Residential',
    capacity: '5.5 kW',
    image: '/images/solar-bg-1.jpg',
    description: 'Modern rooftop solar installation for a family home',
    location: 'Quezon City, Metro Manila',
    dateCompleted: '2024-01-15',
    panelsInstalled: 18,
    annualSavings: '₱45,000',
    co2Reduction: '3.2 tons/year',
    features: ['Grid-tied system', 'Net metering', '25-year warranty', 'Monitoring app'],
    images: ['/images/solar-bg-1.jpg', '/images/solar-bg-2.jpg', '/images/solar-bg-3.jpg', '/images/solar-bg-4.jpg'],
    tags: ['Rooftop', 'Grid-Tied', 'Residential', 'Net Metering', 'Quezon City']
  },
  {
    id: 2,
    title: 'Commercial Solar Farm - Makati',
    category: 'Commercial',
    type: 'Commercial',
    capacity: '250 kW',
    image: '/images/solar-bg-2.jpg',
    images: ['/images/solar-bg-2.jpg', '/images/solar-bg-1.jpg', '/images/solar-bg-3.jpg', '/images/solar-bg-4.jpg'],
    description: 'Large-scale commercial solar system for office building',
    location: 'Makati City, Metro Manila',
    dateCompleted: '2023-11-20',
    panelsInstalled: 800,
    annualSavings: '₱2.1M',
    co2Reduction: '145 tons/year',
    features: ['Commercial grade panels', 'Remote monitoring', 'Maintenance contract', 'ROI tracking'],
    tags: ['Commercial', 'Large-Scale', 'Office Building', 'Makati', 'High Capacity']
  },
  {
    id: 3,
    title: 'Residential Solar Installation - Pasig',
    category: 'Residential',
    type: 'Residential',
    capacity: '7.2 kW',
    image: '/images/solar-bg-3.jpg',
    description: 'Premium solar panel system with battery storage',
    location: 'Pasig City, Metro Manila',
    dateCompleted: '2024-02-10',
    panelsInstalled: 24,
    annualSavings: '₱58,000',
    co2Reduction: '4.1 tons/year',
    features: ['Battery backup', 'Off-grid capable', 'Smart inverter', 'Mobile app control'],
    images: ['/images/solar-bg-3.jpg', '/images/solar-bg-1.jpg', '/images/solar-bg-2.jpg', '/images/solar-bg-4.jpg'],
    tags: ['Battery Storage', 'Off-Grid', 'Premium', 'Pasig', 'Smart System']
  },
  {
    id: 4,
    title: 'Industrial Solar Project - Laguna',
    category: 'Industrial',
    type: 'Industrial',
    capacity: '500 kW',
    image: '/images/solar-bg-4.jpg',
    description: 'Industrial solar installation for manufacturing facility',
    location: 'Laguna Province',
    dateCompleted: '2023-09-05',
    panelsInstalled: 1600,
    annualSavings: '₱4.2M',
    co2Reduction: '290 tons/year',
    features: ['Industrial panels', 'High-efficiency inverters', '24/7 monitoring', 'Dedicated support'],
    images: ['/images/solar-bg-4.jpg', '/images/solar-bg-1.jpg', '/images/solar-bg-2.jpg', '/images/solar-bg-3.jpg'],
    tags: ['Industrial', 'Manufacturing', 'Laguna', 'High-Efficiency', 'Large Scale']
  },
  {
    id: 5,
    title: 'Residential Solar Installation - Taguig',
    category: 'Residential',
    type: 'Residential',
    capacity: '6.0 kW',
    image: '/images/solar-bg-1.jpg',
    description: 'Efficient solar solution for modern home',
    location: 'Taguig City, Metro Manila',
    dateCompleted: '2024-03-22',
    panelsInstalled: 20,
    annualSavings: '₱48,000',
    co2Reduction: '3.5 tons/year',
    features: ['Grid-tied system', 'Net metering', 'Weather-resistant', 'Easy maintenance'],
    images: ['/images/solar-bg-1.jpg', '/images/solar-bg-3.jpg', '/images/solar-bg-2.jpg', '/images/solar-bg-4.jpg'],
    tags: ['Modern Home', 'Taguig', 'Efficient', 'Weather-Resistant', 'Residential']
  },
  {
    id: 6,
    title: 'Commercial Solar System - BGC',
    category: 'Commercial',
    type: 'Commercial',
    capacity: '180 kW',
    image: '/images/solar-bg-2.jpg',
    description: 'Corporate solar installation with monitoring system',
    location: 'Bonifacio Global City, Taguig',
    dateCompleted: '2023-12-18',
    panelsInstalled: 576,
    annualSavings: '₱1.5M',
    co2Reduction: '104 tons/year',
    features: ['Commercial monitoring', 'Energy analytics', 'Maintenance included', 'Performance guarantee'],
    images: ['/images/solar-bg-2.jpg', '/images/solar-bg-4.jpg', '/images/solar-bg-1.jpg', '/images/solar-bg-3.jpg'],
    tags: ['BGC', 'Corporate', 'Monitoring', 'Analytics', 'Commercial']
  },
  {
    id: 7,
    title: 'Government Building Solar - Manila',
    category: 'Government',
    type: 'Government',
    capacity: '320 kW',
    image: '/images/solar-bg-3.jpg',
    description: 'Solar power system for government office building',
    location: 'Manila City',
    dateCompleted: '2023-08-30',
    panelsInstalled: 1024,
    annualSavings: '₱2.7M',
    co2Reduction: '185 tons/year',
    features: ['Government compliance', 'Public reporting', 'Long-term warranty', 'Training provided'],
    images: ['/images/solar-bg-3.jpg', '/images/solar-bg-2.jpg', '/images/solar-bg-4.jpg', '/images/solar-bg-1.jpg'],
    tags: ['Government', 'Manila', 'Compliance', 'Public Sector', 'Office Building']
  },
  {
    id: 8,
    title: 'University Solar Installation - Quezon City',
    category: 'Educational',
    type: 'Educational',
    capacity: '450 kW',
    image: '/images/solar-bg-4.jpg',
    description: 'Large-scale solar system for university campus',
    location: 'Quezon City, Metro Manila',
    dateCompleted: '2023-10-12',
    panelsInstalled: 1440,
    annualSavings: '₱3.8M',
    co2Reduction: '260 tons/year',
    features: ['Educational displays', 'Student monitoring', 'Research integration', 'Campus-wide coverage'],
    images: ['/images/solar-bg-4.jpg', '/images/solar-bg-3.jpg', '/images/solar-bg-1.jpg', '/images/solar-bg-2.jpg'],
    tags: ['University', 'Educational', 'Campus', 'Quezon City', 'Research']
  },
  {
    id: 9,
    title: 'Government Hospital Solar - Pasig',
    category: 'Government',
    type: 'Government',
    capacity: '280 kW',
    image: '/images/solar-bg-1.jpg',
    description: 'Solar energy system for public hospital',
    location: 'Pasig City, Metro Manila',
    dateCompleted: '2024-01-08',
    panelsInstalled: 896,
    annualSavings: '₱2.3M',
    co2Reduction: '162 tons/year',
    features: ['Critical backup', 'Hospital-grade reliability', '24/7 support', 'Emergency power'],
    images: ['/images/solar-bg-1.jpg', '/images/solar-bg-4.jpg', '/images/solar-bg-2.jpg', '/images/solar-bg-3.jpg'],
    tags: ['Hospital', 'Government', 'Critical Infrastructure', 'Pasig', 'Emergency Power']
  },
  {
    id: 10,
    title: 'Industrial Warehouse Solar - Cavite',
    category: 'Industrial',
    type: 'Industrial',
    capacity: '600 kW',
    image: '/images/solar-bg-2.jpg',
    description: 'Massive solar installation for industrial warehouse',
    location: 'Cavite Province',
    dateCompleted: '2023-07-25',
    panelsInstalled: 1920,
    annualSavings: '₱5.1M',
    co2Reduction: '348 tons/year',
    features: ['Warehouse optimization', 'High-capacity system', 'Industrial monitoring', 'Custom installation'],
    images: ['/images/solar-bg-2.jpg', '/images/solar-bg-1.jpg', '/images/solar-bg-4.jpg', '/images/solar-bg-3.jpg'],
    tags: ['Warehouse', 'Industrial', 'Cavite', 'High Capacity', 'Custom']
  },
  {
    id: 11,
    title: 'School Solar Project - Mandaluyong',
    category: 'Educational',
    type: 'Educational',
    capacity: '150 kW',
    image: '/images/solar-bg-3.jpg',
    description: 'Solar panels for public school campus',
    location: 'Mandaluyong City, Metro Manila',
    dateCompleted: '2024-02-28',
    panelsInstalled: 480,
    annualSavings: '₱1.2M',
    co2Reduction: '87 tons/year',
    features: ['Educational program', 'Student involvement', 'Cost savings for school', 'Environmental education'],
    images: ['/images/solar-bg-3.jpg', '/images/solar-bg-2.jpg', '/images/solar-bg-1.jpg', '/images/solar-bg-4.jpg'],
    tags: ['School', 'Educational', 'Mandaluyong', 'Public School', 'Education']
  },
  {
    id: 12,
    title: 'Commercial Mall Solar - Ortigas',
    category: 'Commercial',
    type: 'Commercial',
    capacity: '800 kW',
    image: '/images/solar-bg-4.jpg',
    description: 'Large commercial mall solar installation',
    location: 'Ortigas Center, Pasig',
    dateCompleted: '2023-06-15',
    panelsInstalled: 2560,
    annualSavings: '₱6.8M',
    co2Reduction: '464 tons/year',
    features: ['Mall-wide coverage', 'High visibility', 'Marketing benefits', 'Maximum ROI'],
    images: ['/images/solar-bg-4.jpg', '/images/solar-bg-2.jpg', '/images/solar-bg-3.jpg', '/images/solar-bg-1.jpg'],
    tags: ['Mall', 'Commercial', 'Ortigas', 'High Visibility', 'Maximum ROI']
  }
]

