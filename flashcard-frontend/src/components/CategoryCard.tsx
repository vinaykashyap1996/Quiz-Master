'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  imageSrc: string;
  name: string;
  description: string;
  href?: string;
}

export default function CategoryCard({
  imageSrc,
  name,
  description,
  href,
}: CategoryCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.4,
      }}
      className='bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer flex flex-col items-center text-center'>
      <Image
        width={160}
        height={160}
        src={imageSrc}
        alt={name}
        className='w-40 h-40 object-cover rounded-full mb-4'
        loading='lazy'
      />
      <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
        {name}
      </h3>
      <p className='text-gray-600 dark:text-gray-300'>{description}</p>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
