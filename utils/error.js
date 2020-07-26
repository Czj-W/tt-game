class AuthTokenError {
	constructor(msg) {
		this.msg = msg;
	}
}

// 网络请求异常，request不成功
class MiniAppApiError {
	constructor(msg) {
		this.msg = msg;
	}
}

// server异常，http status code 不等于200
class ServerError {
	constructor(msg) {
		this.msg = msg;
	}
}

// 业务异常 result_code 不等于0
class LogicError {
	constructor(msg) {
		this.msg = msg;
	}
}

export {
	AuthTokenError,
	MiniAppApiError,
	ServerError,
	LogicError,
};
