import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Primary School',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSeOwUWfAGU_8HCMyK_zsGSPIYfndvDkO3CNJYw4Yoq43H0wBg/viewform?usp=dialog ',
    image: 'https://cdn-icons-png.flaticon.com/512/201/201818.png'
  },
  {
    name: 'High School',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSeR8ZAC7h6d1ACVJKTEb3bfh-gTH3lCJzj-MDMIB5v-14ThSA/viewform?usp=header',
      image: 'https://th.bing.com/th/id/OIP.9H2Vz_efkzS-ikdAhgJGAgHaHa'
  },
  {
    name: '+2 Science',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSfEysidMmER0uICV51MISb6R3IW-zzwnGOftHa6PudsMRAC_g/viewform?usp=header',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/009/098/321/small/student-icon-line-free-vector.jpg'
  },
  {
    name: 'UG/PG',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSfQ8YHa_tTzq-KHE7bHSkb0xKLIEXpPutU9X4QBcU9Ffc73aQ/viewform?usp=header ',
    image: 'https://cdn-icons-png.flaticon.com/512/2416/2416471.png'
  },
  {
    name: 'Competitive Exams',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSd_ZusIbyKnOj2-2Opi1VefmfX01WO_01_Dh0uPOKMUM8AAIg/viewform?usp=header ',
    image: 'https://cdn-icons-png.flaticon.com/512/2416/2416471.png'
  },
  {
    name: 'Special Products',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSclUtescsNIHhUYwyMv0L8bJfZ0eQil8zDIO76PeOdV1nAamA/viewform?usp=header ',
    image: 'https://cdn-icons-png.flaticon.com/512/2416/2416471.png'
  }
];

function Sell() {
  return (
    <div className="container mx-auto text-center py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Post Your Ad</h1>
      <div className="flex flex-wrap justify-around gap-8 text-bold">
        {categories.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-40"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-12 h-12 mx-auto mb-3"
            />
            <span className="text-gray-600">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sell; 