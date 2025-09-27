export type ClerkEventT = "user.created" | "user.deleted" | "user.updated";

export interface ClerkDeleteUserWebhookPayload {
  deleted: boolean;
  id: string;
  object: "user";
}

export type ClerkUserWebhookPayload = {
  id: string;
  object: "user";
  created_at: number;
  updated_at: number;
  email_addresses: ClerkEmailAddress[];
  external_accounts: ClerkExternalAccount[];
  enterprise_accounts: unknown[];
  external_id: string | null;
  first_name: string;
  last_name: string;
  has_image: boolean;
  image_url: string;
  profile_image_url: string;
  last_active_at: number;
  last_sign_in_at: number | null;
  legal_accepted_at: number | null;
  locked: boolean;
  lockout_expires_in_seconds: number | null;
  mfa_disabled_at: number | null;
  mfa_enabled_at: number | null;
  password_enabled: boolean;
  passkeys: unknown[];
  phone_numbers: unknown[];
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id: string | null;
  private_metadata: Record<string, unknown>;
  public_metadata: Record<string, unknown>;
  unsafe_metadata: Record<string, unknown>;
  saml_accounts: unknown[];
  totp_enabled: boolean;
  two_factor_enabled: boolean;
  username: string | null;
  verification_attempts_remaining: number;
  web3_wallets: unknown[];

  // Additions from UPDATE payload:
  backup_code_enabled: boolean;
  banned: boolean;
  create_organization_enabled: boolean;
  delete_self_enabled: boolean;
};

interface ClerkEmailAddress {
  id: string;
  object: "email_address";
  email_address: string;
  created_at: number;
  updated_at: number;
  linked_to?: unknown[];
  matches_sso_connection: boolean;
  reserved: boolean;
  verification?: Record<string, unknown>;
}

interface ClerkExternalAccount {
  id: string;
  object: "google_account" | string;
  provider: "oauth_google" | string;
  provider_user_id: string;
  approved_scopes: string;
  avatar_url: string;
  email_address: string;
  external_account_id: string;
  family_name: string;
  first_name: string;
  given_name: string;
  google_id: string;
  identification_id: string;
  image_url: string;
  label: string | null;
  last_name: string;
  picture: string;
  public_metadata: Record<string, unknown>;
  updated_at: number;
  username: string | null;
  verification?: Record<string, unknown>;
}
