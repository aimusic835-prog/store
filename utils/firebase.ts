 import { ref, update } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '@/config/firebase';
import { RegistrationData } from '@/context/RegistrationContext';

export async function createFirebaseUser(email: string, password: string): Promise<string> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user.uid;
}

export async function saveUserDataToFirebase(
  uid: string,
  data: Partial<RegistrationData>
): Promise<void> {
  const userRef = ref(database, `users/${uid}`);

  const updateData: any = {
    id: uid,
    uid: uid,
    updatedAt: Date.now(),
  };

  if (data.email) {
    updateData.email = data.email;
  }

  if (data.phone) {
    updateData.phone = data.phone;
  }

  if (data.profile) {
    updateData.profile = {
      firstName: data.profile.firstName || '',
      lastName: data.profile.lastName || '',
      dob: data.profile.dob || '',
      profilePicture: data.profile.profilePicture || '',
    };
  }

  if (data.license) {
    updateData.license = {
      number: data.license.number || '',
      expiry: data.license.expiry || '',
      licenseImage: data.license.licenseImage || '',
      selfieWithLicense: data.license.selfieWithLicense || '',
    };
  }

  if (data.idCard) {
    updateData.idCard = {
      idNumber: data.idCard.idNumber || '',
      idImage: data.idCard.idImage || '',
    };
  }

  if (data.vehicle) {
    updateData.vehicle = {
      type: data.vehicle.type || '',
      brand: data.vehicle.brand || '',
      model: data.vehicle.model || '',
      productionYear: data.vehicle.productionYear || '',
      color: data.vehicle.color || '',
      plateNumber: data.vehicle.plateNumber || '',
      registrationCertificate: data.vehicle.registrationCertificate || '',
      carImage: data.vehicle.carImage || '',
      seats: data.vehicle.seats || 0,
    };
  }

  if (data.operation) {
    updateData.operation = {
      place: data.operation.place || '',
      available: data.operation.available || false,
    };
  }

  if (!updateData.createdAt) {
    updateData.createdAt = Date.now();
  }

  if (data.role) {
    updateData.role = data.role;
  }

  await update(userRef, updateData);
}
