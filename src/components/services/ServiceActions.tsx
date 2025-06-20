
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2 } from 'lucide-react';
import { Service } from '@/types/service';
import { useConfiguration } from '@/contexts/ConfigurationContext';

interface ServiceActionsProps {
  service: Service;
  onUpdate: (id: string, data: Partial<Service>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const ServiceActions = ({ service, onUpdate, onDelete }: ServiceActionsProps) => {
  const { 
    serviceTypes, 
    providerNames, 
    currencies, 
    frequencies, 
    paidViaOptions 
  } = useConfiguration();
  
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: service.name,
    description: service.description || '',
    type: service.type,
    provider: service.provider,
    amount: service.amount,
    currency: service.currency,
    frequency: service.frequency,
    expirationDate: service.expirationDate,
    registerDate: service.registerDate,
    paidVia: service.paidVia,
    autoRenew: service.autoRenew
  });

  const handleUpdate = async () => {
    await onUpdate(service.id, editData);
    setEditOpen(false);
  };

  const handleDelete = async () => {
    await onDelete(service.id);
  };

  return (
    <div className="flex space-x-2">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="type">Service Type</Label>
              <Select value={editData.type} onValueChange={(value) => setEditData({...editData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="provider">Provider</Label>
              <Select value={editData.provider} onValueChange={(value) => setEditData({...editData, provider: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {providerNames.map(provider => (
                    <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({...editData, amount: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={editData.currency} onValueChange={(value) => setEditData({...editData, currency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={editData.frequency} onValueChange={(value) => setEditData({...editData, frequency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map(frequency => (
                    <SelectItem key={frequency} value={frequency}>{frequency}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paidVia">Paid Via</Label>
              <Select value={editData.paidVia} onValueChange={(value) => setEditData({...editData, paidVia: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paidViaOptions.map(method => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={editData.expirationDate}
                  onChange={(e) => setEditData({...editData, expirationDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="registerDate">Register Date</Label>
                <Input
                  id="registerDate"
                  type="date"
                  value={editData.registerDate}
                  onChange={(e) => setEditData({...editData, registerDate: e.target.value})}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="autoRenew"
                checked={editData.autoRenew}
                onCheckedChange={(checked) => setEditData({...editData, autoRenew: checked})}
              />
              <Label htmlFor="autoRenew">Auto-Renew</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{service.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
