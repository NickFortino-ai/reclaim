import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import type { PurchasesPackage, CustomerInfo } from '@revenuecat/purchases-capacitor';
import { isNative } from '../utils/platform';

const RC_API_KEY_IOS = import.meta.env.VITE_REVENUECAT_IOS_KEY || '';

export async function initRevenueCat(): Promise<void> {
  if (!isNative()) return;

  await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
  await Purchases.configure({ apiKey: RC_API_KEY_IOS });
}

export async function loginRevenueCat(userId: string): Promise<void> {
  if (!isNative()) return;
  await Purchases.logIn({ appUserID: userId });
}

export async function logoutRevenueCat(): Promise<void> {
  if (!isNative()) return;
  await Purchases.logOut();
}

export async function getOfferings() {
  const offerings = await Purchases.getOfferings();
  return offerings.current;
}

export async function purchasePackage(pkg: PurchasesPackage): Promise<CustomerInfo> {
  const result = await Purchases.purchasePackage({ aPackage: pkg });
  return result.customerInfo;
}

export async function getCustomerInfo(): Promise<CustomerInfo> {
  const result = await Purchases.getCustomerInfo();
  return result.customerInfo;
}

export async function restorePurchases(): Promise<CustomerInfo> {
  const result = await Purchases.restorePurchases();
  return result.customerInfo;
}
