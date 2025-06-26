import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Shop With Us</h3>
            <ul className="space-y-2">
               <li><Link to="/product-listing" className="text-sm text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Your Account</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Your Orders</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
             <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Follow Us</h3>
             <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
                <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
                <a href="#" aria-label="Github" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></a>
             </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-muted">
            <p className="text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Amazone Clone, Inc. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;