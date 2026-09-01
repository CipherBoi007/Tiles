import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '../hooks/useDataFetch';
import { Link, useNavigate } from 'react-router-dom';
import SafeImage from './SafeImage';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';

const CategoryGrid = () => {
  const { data: categories } = useCategories(4);
  const navigate = useNavigate();
  const displayCategories = (Array.isArray(categories) ? categories : []).slice(0, 4);

  return (
    <section id="categories" className="py-20 bg-brand-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-black font-luxury mb-4">Shop by Category</h2>
            <p className="text-brand-textMuted text-lg max-w-2xl">Find the perfect tiles tailored for every architectural requirement.</p>
          </FadeUp>
          <Link to="/collections" className="hidden md:flex items-center gap-2 text-brand-gold font-medium hover:text-yellow-600 transition-colors">
            Explore Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((cat) => (
            <StaggerItem 
              key={cat.id} 
              className="group relative overflow-hidden rounded-2xl cursor-pointer bg-brand-black border border-gray-200/80 hover:border-brand-gold shadow-md hover:shadow-2xl hover:shadow-brand-gold/15 transition-all duration-500 hover:-translate-y-2 aspect-[3/4] sm:aspect-[4/5] min-h-[380px] sm:min-h-[420px]"
              onClick={() => {
                navigate(`/collections?categoryId=${cat.id}`);
              }}
            >
              <SafeImage 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/55 to-black/15 group-hover:via-brand-black/40 transition-colors duration-500 flex flex-col justify-end p-6"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-brand-white">
                <h3 className="text-white text-2xl sm:text-3xl font-luxury font-bold group-hover:text-brand-gold transition-colors duration-300 leading-snug">{cat.name}</h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <Link to="/collections" className="md:hidden mt-8 w-full flex justify-center items-center gap-2 text-brand-gold font-medium hover:text-yellow-600">
          View All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
