export const MEMBER_LOGIN =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/memberlogin';

export const SEND_EMAIL_VERIFICATION =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/verification/register/send?postedfrom=mobile&firstname=';

export const GET_PROVINCE =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/provinces?name=';

export const GET_MUNICIPALITIES =
// 'https://intellicare.com.ph/uat/webservice/memberprofile/api/municipalities?name='
  'https://feliza.intellicare.ph/webservice/memberprofile/api/municipalitiesv2?name=';

export const POST_REGISTRATION =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/registration';

export const MEDGATE_TOKEN_REQUEST_TEST =
  'https://schedulingtest.medgatephilippines.com/CallbackRequestService/Token';

export const MEDGATE_TOKEN_REQUEST_LIVE =
  'https://scheduling.medgatephilippines.com/CallbackRequestService/Token';

export const MEDGATE_CALLBACK_REQUEST_TEST =
  'https://schedulingtest.medgatephilippines.com/CallbackRequestService/RequestCallback?phoneNumber=';

export const MEDGATE_CALLBACK_REQUEST_LIVE =
  'https://scheduling.medgatephilippines.com/CallbackRequestService/RequestCallback?phoneNumber=';

export const FORGOT_PASSWORD_VERIFICATION_CODE =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/verification/forgotpassword/send?postedfrom=mobile';

export const REGISTRATION_SEND_OTP =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/verification/register/validate';

export const FORGOT_PASSWORD_VALIDATE_OTP =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/verification/forgotpassword/validate';

export const FORGOT_PASSWORD_NEW_PASSWORD =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/member/forgotpassword/changepassword';

//AGORA MAP
export const GOOGLE_MAPS_APIKEY = 'GOOGLEMAP API KEY';
export const MAPLOGIN_TOKEN =
  'https://feliza.intellicare.ph/webservice/thousandminds/api/login';
export const ACCREDITED_HOSPITALS =
  'https://feliza.intellicare.ph/webservice/thousandminds/api/providers/map?type=H';
export const ACCREDITED_CLINICS =
  'https://feliza.intellicare.ph/webservice/thousandminds/api/providers/map?type=C';
export const NEARBY_HOSPITALS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/providers/map/nearest?km=3&hstype=H';
export const NEARBY_CLINICS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/providers/map/nearest?km=1&hstype=C';
//RCS
export const RCS_MEMBERS_PROFILE =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/member/accounts';
export const RCS_PROVIDERS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/providers/find?name=&location=';
export const RCS_SPECIALTIES =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs1/specialty';
//RCS-1
export const RCS1_CANCEL_REMARKS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs/cancel';
export const RCS1_HISTORY_DETAILS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs/history/details?ercs=';
export const RCS1_SENDTOMAIL =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs1/sendtoemail?no=';
export const RCS1_TRANSACTION_HISTORY =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs/history?acct=';
export const RCS1_CONSULT_TYPE =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs1/consulttype';
export const RCS1_ILLNESS_LIST =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs1/illness?gender=';
export const RCS1_DOCTOR_BY_SPECS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs1/doctors?name=';
export const RCS1_SUBMIT =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs1/submit';
export const RCS1_ILLNESS_BY_GENDER =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs1/illness?gender=';
//RCS-2
export const RCS2_SENDTOMAIL =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/sendtoemail?no=';
export const RCS2_HISTORY_DETAILS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/history/details?ercs=';
export const RCS2_HISTORY_PROCEDURES =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/history/procedures?ercs=';
export const RCS2_HISTORY_DOCS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/history/documents?ercs=';
export const RCS2_TRANSACTION_HISTORY =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/history?acct=';
export const RCS2_PROCEDURES_LIST =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/procedures';
export const RCS2_DOCTOR_BY_SPECS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/doctors?name=';
export const RCS2_SUBMIT =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/submit';
export const RCS2_CANCEL_REMARKS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/ercs2/cancel';
export const PRE_APPROVED_UTIL =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/member/utilization/preapproved';
export const POSTED_UTIL =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/member/utilization/postedutil';
export const MEMBERS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/member/accounts';
export const BENEFITS =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/member/benefits';
export const MEDGATE =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/feature/status?name=MEDGATE';

//DOCTOR SEARCH
export const DOCTOR_SEARCH_ADVANCED =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/providers/find/advancesearch?paging=${pageIndex}&pagesize=30';

export const DOCTOR_SEARCH_DETAILS_ADVANCED =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/providers/find/advancesearch/details';
export const FILE_PATH_IMAGE =
  'https://feliza.intellicare.ph/webservice/memberprofile/api/member/filepathtoimage';
