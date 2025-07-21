import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
    private readonly firebaseAdmin: admin.app.App;

    constructor() {
        this.firebaseAdmin = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env['PROJECT_ID'],
                clientEmail: process.env['CLIENT_EMAIL'],
                privateKey: process.env['FIREBASE_PRIVATE_KEY'],
            }),
        });
    }

    async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
        try {
            const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(idToken);
            return decodedToken;
        } catch (error: any) {
            throw error;
        }
    }

}
