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

  /**
   * 新規登録
   * @param email メールアドレス
   * @param password パスワード
   * @param name 名前
   * @param role ロール
   */
  async register(
    email: string,
    password: string,
    name: string,
    role: string
  ): Promise<string> {
    try {
      const user = await this.auth.createUser({
        email: email,
        password: password,
        displayName: name,
      });
      const uid = user.uid;
      await this.auth.setCustomUserClaims(uid, { role: role });
      return this.auth.createCustomToken(uid);
    } catch (error) {
      console.error("Register Error", error);
      throw error;
    }
  }

  /**
   * トークン確認
   * @param idToken トークン（フロントエンド側で取得）
   * @param role ロール
   * @returns 問題なければtrue
   */
  async verifyToken(idToken: string, role: string): Promise<boolean> {
    try {
      const result = await this.auth.verifyIdToken(idToken);
      const user = await this.auth.getUser(result.uid);
      const userRole = user.customClaims?.role ?? undefined;
      return userRole === role;
    } catch (error) {
      console.error("Verify Token Error", error);
      return false;
    }
  }
}
