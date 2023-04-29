import * as Firebase from "firebase-admin";
import secret from "../../../secrets/FirebaseAdminSecret.json";

Firebase.initializeApp({
  credential: Firebase.credential.cert({
    projectId: secret.project_id,
    privateKey: secret.private_key,
    clientEmail: secret.client_email,
  }),
});

/**
 * Firebase Authを扱うクラス
 */
export class FirebaseAuth {
  private auth: Firebase.auth.Auth;

  /**
   * コンストラクタ
   */
  constructor() {
    this.auth = Firebase.auth();
  }
}
