export type Role = 'BUYER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  organizationId: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  taxId: string;
  address: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  logoUrl?: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  isVerified: boolean;
  categories: string[];
  contactEmail: string;
  logoUrl?: string;
}

export interface Warranty {
  id: string;
  durationMonths: number;
  description: string;
  coverageType: 'STANDARD' | 'EXTENDED' | 'PREMIUM';
  provider: string;
}

export interface Product {
  id: string;
  supplierId: string;
  supplier: Supplier;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  stockLevel: number;
  sku: string;
  images: string[];
  specs: Record<string, string>;
  warranty: Warranty;
  rating?: number;
}

export type OrderStatus = 'PENDING' | 'APPROVED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  warrantyId?: string;
}

export interface Order {
  id: string;
  organizationId: string;
  userId: string;
  supplierId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  invoiceUrl?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
