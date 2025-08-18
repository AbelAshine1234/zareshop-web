import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  { value: 'addis-ababa', label: 'Addis Ababa', fee: 50 },
  { value: 'dire-dawa', label: 'Dire Dawa', fee: 80 },
  { value: 'mekelle', label: 'Mekelle', fee: 100 },
  { value: 'bahir-dar', label: 'Bahir Dar', fee: 90 },
  { value: 'hawassa', label: 'Hawassa', fee: 85 }
];

const paymentMethods = [
  { value: 'telebirr', label: 'Telebirr' },
  { value: 'cbe-birr', label: 'CBE Birr' },
  { value: 'chapa', label: 'Chapa' },
  { value: 'cod', label: 'Cash on Delivery' }
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useAppContext();
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    location: '',
    paymentMethod: '',
    address: ''
  });

  const selectedLocation = locations.find(loc => loc.value === formData.location);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = selectedLocation?.fee || 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    dispatch({ type: 'CLEAR_CART' });
  };

  if (step === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Order Placed!</h3>
            <p className="text-gray-600 mb-4">Your order has been confirmed. Track your delivery in the orders section.</p>
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Delivery Location</Label>
            <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label} (+{location.fee} ETB)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="address">Delivery Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter your full address"
              required
            />
          </div>

          <div>
            <Label>Payment Method</Label>
            <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
              {paymentMethods.map(method => (
                <div key={method.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.value} id={method.value} />
                  <Label htmlFor={method.value}>{method.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{subtotal.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{deliveryFee.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-600">{total.toLocaleString()} ETB</span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Place Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};