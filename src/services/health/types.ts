/**
 * KinGuard Mobile Health Data Abstraction.
 *
 * Provides a decoupled interface for connecting device-local health stores
 * (Apple HealthKit on iOS, Google Health Connect on Android) and cloud wearable providers.
 *
 * Architecture:
 * React Native Screens -> KinGuard HealthDataConnection Abstraction -> Open Wearables RN SDK -> HealthKit / Health Connect
 */

export type ConnectionStatus =
  | 'connected'
  | 'syncing'
  | 'up_to_date'
  | 'delayed'
  | 'error'
  | 'disconnected';

export type HealthProviderType =
  | 'apple_health'
  | 'health_connect'
  | 'garmin'
  | 'oura'
  | 'fitbit'
  | 'whoop';

export type HealthDataScope =
  | 'view_wearable_summary'
  | 'view_wearable_activity'
  | 'view_wearable_sleep'
  | 'view_wearable_heart_rate'
  | 'view_wearable_raw_metrics'
  | 'manage_wearable_connections';

export interface HealthConnectionState {
  provider: HealthProviderType;
  status: ConnectionStatus;
  lastSyncedAt: Date | null;
  errorMessage?: string;
  grantedScopes: HealthDataScope[];
}

export interface SyncTelemetryResult {
  recordsProcessed: number;
  syncedAt: Date;
  status: ConnectionStatus;
  sourceProvider: HealthProviderType;
}

/**
 * Core KinGuard Health Data Connection Abstraction.
 * React Native screens MUST code against this interface rather than
 * coupling directly to vendor or Open Wearables SDK APIs.
 */
export interface HealthDataConnection {
  readonly provider: HealthProviderType;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getStatus(): Promise<ConnectionStatus>;
  syncRecentData?(): Promise<SyncTelemetryResult>;
  getState?(): Promise<HealthConnectionState>;
}
