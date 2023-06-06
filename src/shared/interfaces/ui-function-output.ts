interface ResponseReceiveQueue {
  responseReceiveQueue?: string;
}

export interface UIFunctionOutput extends ResponseReceiveQueue {
  ui_key_general_user_id: string;
  ui_key_general_user_language: string;
  ui_key_general_business_partner: string;
  ui_function: string;
  ui_key_function_url: string;
  runtime_session_id: string;
  Params: Object;
}
