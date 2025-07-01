import Constants from 'expo-constants';
const extra = Constants.expoConfig.extra;
export const Config = {
  app_name: Constants.expoConfig.name,
  app_version: Constants.expoConfig.version,
//   base_url: "https://apigw.kubekkp.coofis.com/",
//   base_url_kores: "https://crsfe3.kubekkp.coofis.com/",
//   base_url_auth: "https://auth.kubekkp.coofis.com/mobile/login/",
//   base_url_cuti: "https://cuti.kubekkp.coofis.com/api/",
//   base_url_helpdesk: "https://helpdesk.kubekkp.coofis.com/api/",
//   upgrade_url: "https://portal.kkp.go.id/kkp",
  notFound: notFound[extra.id],
  oneSignalAppId: extra.oneSignalAppId,
  maps: maps[extra.id],
  avatar: avatar[extra.id],
  statusbarAuth: extra.statusBarAuth,
  statusbarAuthenticated: extra.statusBarAuthtenticated
}