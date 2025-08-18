import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, CheckCircle } from 'lucide-react';

interface SellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellerModal: React.FC<SellerModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '+251',
    faydaId: null as File | null,
    businessLicense: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setStep('success');
  };

  const handleFileUpload = (field: 'faydaId' | 'businessLicense') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  if (step === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Application Submitted!</h3>
            <p className="text-gray-600 mb-4">Your seller application is under review. We'll contact you within 2-3 business days.</p>
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Become a Seller</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label>Fayda ID</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload('faydaId')}
                className="hidden"
                id="fayda-upload"
              />
              <label htmlFor="fayda-upload" className="cursor-pointer text-sm text-gray-600">
                {formData.faydaId ? formData.faydaId.name : 'Upload Fayda ID'}
              </label>
            </div>
          </div>

          <div>
            <Label>Business License</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload('businessLicense')}
                className="hidden"
                id="license-upload"
              />
              <label htmlFor="license-upload" className="cursor-pointer text-sm text-gray-600">
                {formData.businessLicense ? formData.businessLicense.name : 'Upload Business License'}
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};