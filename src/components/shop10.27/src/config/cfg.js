/*
* 配置文件
*/

// 对应于const.inc中定义（注意一致[XXX]）
export const errcode = {
    SYS_ERR: -10001,       // 系统出错
    PARAM_ERR: -10002,       // 参数出错
    SYS_BUSY: -10003,       // 系统忙
    USER_NO_EXIST: -10005,       // 用户不存在
    USER_HAD_REG: -10006,       // 此用户名已被注册
    USER_PASSWD_ERR: -10007,       // 登录密码出错
    DATA_PASSWD_ERR: -10008,       // 密码错误
    DATA_CHANGE: -10009,       // 数据已有变动（刷新后再修改）
    DATA_OWNER_ERR: -10010,       // 不是当前用户的数据
    DATA_KEY_USED: -10011,       // key已被使用
    USER_NAME_EMPTY: -10012,       // 用户名不能为空
    FILE_NOT_EXIST: -10013,       // 文件不存在
    CREATE_ZIPFILE_ERR: -10014,       // 创建zip压缩文件出错
    FILE_UPLOAD_ERR: -10015,       // 文件上传出错
    OPEN_ZIPFILE_ERR: -10016,       // 打开压缩文件出错
    NO_BAK_FILE: -10017,       // 文件格式出错（不是备份文件）
    BAKFILE_DATA_ERR: -10018,       // 备份文件中数据出错
    BAKFILE_PASSWD_ERR: -10019,       // 备份文件密码出错
    USER_NOLOGIN: -10020,       // 用户未登录
    USER_LOGINED: -10021,       // 用户已经登录过
    DATA_KEY_NOT_EXIST: -10022,       // 通讯用key不存在
    DB_OPR_ERR: -10023,       // 数据库操作出错
    PHONE_IS_EXIST: -10026,       // 手机号已被使用
    USER_SETTING_ERR: -10028,       // 设置登录用户出错
    CFG_NO_EXIST: -20001,       // 配置文件不存在
    CFG_WRITE_ERR: -20002,       // 配置文件写入出错
    GOODS_SERIAL_USED: -20003,       // 货品编号已被使用
    CLASS_NAME_USED: -20004,       // 类别名已存在
    GOODS_NOT_EXIST: -20005,       // 货品不存在
    USER_OLD_PASSWD_ERR: -20006,       // 原密码错误
    FILE_IS_DIR: -20007,       // 是个目录
    FILE_BAK_ERR: -20008,       // 备份文件出错
    FILE_PATH_ERR: -20009,       // 路径出错
    FILE_WRITE_ERR: -20010,       // 文件写入出错
    USER_PERMISSION_ERR: -20011,       // 操作权限不足
    FILE_NO_EXIST: -20012,       // 文件不存在
    LOG_OPR_ERR: -20013,       // 日志操作出错
    LOG_NO_EXIST: -20014,       // 日志不存在
    DB_ERR: -20030,       // 数据库操作出错
    UPDATE_PACK_ERR: -20031,       // 升级包出错
    BATCH_FILE_NOT_UNIQ: -20032,       // 同批次文件中存在相同文件
    NOT_GROUP_FILE: -20033,       // 没有组文件
    NAME_IS_EXIST: -20034,       // 名称已存在
    HOTEL_NOT_EXIST: -20035,       // 酒店不存在
    PHONE_ERR: -20037,       // 手机号码不正确
    COKE_ERR: -20038,       // 验证码不正确
    IMG_ERRL: -20040,        //图片验证码不正确
    MESSAGE_ERR: -20042,    //短信验证码不正确
    PARAMETERNO: -20044,    //参数不全

    // 2017-05-02
    FOOD_IMG_TOOMANY: -30010,       // 图片过多
    FOOD_EXIST: -30011,       // 餐品名称已存在
    ORDER_STATUS_ERR: -30012,       // 订单状态出错
    BROWSER_NOT_WEIXIN: -30013,       // 请在微信中打开
    SHOP_NOT_WEIXIN: -30014,       // 店铺不存在
    ORDER_NOT_MODIFY: -30015,       // 订单处于不可更改阶段，可重新下单
    ORDER_ST_CONFIRMED: -30016,       // 订单已确认，不能修改
    ORDER_ST_PAID: -30017,       // 订单已支付，不能修改
    ORDER_ST_FINISH: -30018,       // 订单已完成，不能修改
    ORDER_ST_CANCEL: -30019,       // 订单已作废，不能修改
    ORDER_ST_TIMEOUT: -30020,       // 订单超时，不能修改
    ORDER_ST_PRINTED: -30021,       // 订单已出单，不能修改
    ORDER_ST_ERR: -30022,       // 订单出错，不能修改
    SEAT_NOT_EXIST: -30023,       // 餐桌号不存在
    SHOP_NOT_EXIST: -30024,       // 店铺不存在
    FOOD_NOT_ENOUGH: -30025,       // 餐品存量不够
    ORDER_OPR_ERR: -30026,       // 订单操作出错
    FOOD_NOT_EXIST: -30027,       // 餐品不存在
    ORDER_NOT_EXIST: -30028,       // 订单不存在
    ORDER_HAD_CHANGE: -30029,       // 订单已有变动，请刷新后再操作

    code: {
        "-1": "系统出错",
        "-10001": "系统出错",
        "-10002": "参数出错",
        // "-10005": "用户不存在(请联系管理员)",
        "-10005": "用户不存在",
        "-10006": "此用户名已被注册",
        // "-10007": "登录密码出错",
        "-10007": "用户名或密码错误",
        "-10008": "用户名或密码错误",
        // "-10008": "密码错误",
        "-10009": "数据已有变动（刷新后再修改）",
        "-10010": "不是当前用户的数据",
        "-10011": "key已被使用",
        "-10012": "用户名不能为空",
        "-10013": "文件不存在",
        "-10014": "创建zip压缩文件出错",
        "-10015": "文件上传出错",
        "-10016": "打开压缩文件出错",
        "-10017": "文件格式出错（不是备份文件）",
        "-10018": "备份文件中数据出错",
        // "-10018": "备份文件密码出错",
        "-10020": "用户未登录",
        "-10021": "用户已经登录过",
        "-10022": "KEY过期，请再次尝试当前操作。",
        "-10023": "数据库操作出错",
        "-20001": "配置文件不存在",
        "-20002": "配置文件写入出错",
        "-20003": "货品编号已被使用",
        "-20004": "类别名已存在",
        "-20005": "货品不存在",
        "-20006": "原密码错误",
        "-20007": "是个目录",
        "-20008": "备份文件出错",
        "-20009": "路径出错",
        "-20010": "文件写入出错",
        "-20011": "操作权限不足",
        "-20012": "文件不存在",
        "-20013": "日志操作出错",
        "-20014": "日志不存在",
        "-20030": "数据库操作出错",
        "-20031": "升级包出错",
        "-20032": "同批次文件中存在相同文件",
        "-20033": "没有组文件",
        "-20034": "名称已存在",
        "-30010": "图片过多",
        "-30011": "餐品名称已存在",
        "-30012": "订单出错",
        "-30013": "请在微信中打开",
        "-30014": "店铺不存在",
        "-30015": "订单不可更改，可重新下单",
        "-30016": "订单已出单，修改请联服务员",
        "-30017": "订单已支付，不能修改",
        "-30018": "订单已完成，不能修改",
        "-30019": "订单已作废，不能修改",
        "-30020": "订单超时，不能修改",
        "-30021": "订单已出单，不能修改",
        "-30022": "订单出错",
        "-30023": "餐桌号不存在",
        "-30024": "店铺不存在",
        "-30025": "餐品存量不够",
        "-30026": "订单操作出错",
        "-30027": "餐品不存在",
        "-30028": "订单不存在",
        "-30029": "订单已有变动，请刷新后再操作",
        "-20037": "手机号码不正确",
        "-20038": "验证码错误",
        /*
         * 注意同步修改 const.inc --> errcode
         */
        "0": ""
    },
    toString: function (code) {
        return this.code[code] || "未知错误[" + code + "]";
    }
};
//是否会员
export const IsVipCustomer = {
    YES: 1,
    NO: 0,
    code: {
        1: "是",
        0: "否"
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || "未知[" + code + "]";
    }
};

//餐品类型（1:使用这里设置的价格, 2:使用份量中的价格）
export const FoodType = {
    YES: 1,
    NO: 2,
    code: {
        1: "是",
        2: "否"
    },
    toString: function (code) {
        code = parseInt(code || 1);
        return this.code[code] || "未知[" + code + "]";
    }
};

// 规格类型（1:对价格无影响的规格, 2:对价格有影响的规格）是否是分量
export const IsSizeSpec = {
    YES: 2,
    NO: 1,
    code: {
        1: "不影响价格",
        2: "影响价格"
    },
    toString: function (code) {
        code = parseInt(code || 2);
        return this.code[code] || "未知[" + code + "]";
    }
};

//支付方式( 0微信支付，1现金支付，2餐后 )
export const PayWay = {
    WECHAT: 0,
    CASH: 1,
    AFE: 2,
    code: {
        0: "微信支付",
        1: "现金支付",
        2: "餐后支付"
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || "未知[" + code + "]";
    }
};

//订单状态
export const OrderStatus = {
    NOTSURE: 0,      //不确定
    PENDING: 1,      //待支付
    FINISH: 2,       //交易完成
    DRAWBACK: 3,     //退款中
    DRAWBACKYES: 4,  //退款成功
    DRAWBACKNO: 5,   //退款失败
    COMMENT: 6,      //待评价
    code: {
        0: "不确定",
        1: "待支付",
        2: "交易完成",
        3: "退款中",
        4: "退款成功",
        5: "退款失败",
        6: "待评价",
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    },
    getDrawback: function () {
        return [this.DRAWBACK, this.DRAWBACKYES, this.DRAWBACKNO];
    }
};

//顾客性别
export const CustomSex = {
    SECRECY: 0, //不确认，保密
    MAN: 1,    //男
    FAMEN: 2,  //女
    code: {
        0: "保密",
        1: "男",
        2: "女",
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//是否开发票
export const Invoce = {
    NO: 0,
    YES: 1,
    PAPERINVOICE: 2,
    ELECTRONICINVOICE: 3,
    SHOWPAPERINVOICE: 4,
    code: {
        0: '不提供发票',
        1: '提供发票',
        2: '纸质发票',
        3: '电子发票',
        4: '显示支票下面的子类',
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//启用、暂停系统

export const Startsystem = {
    START: 0,
    PAUSE: 1,
    code: {
        0: '启用',
        1: '暂停',
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};


//支付方式 (店铺端设置)
export const Payway = {
    CASHPAYMENT: 1,
    CARDPAYMENT: 2,
    ALIPAY: 3,
    WECHATPAY: 4,
    code: {
        1: '现金支付',
        2: '刷卡支付',
        3: '支付宝支付',
        4: '微信支付',
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//付款时机(餐前、餐后)
export const PayTime = {
    BEFOREPAY: 1,
    AFTERPAY: 2,
    code: {
        1: '餐前支付',
        2: '餐后支付',
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//销售方式

export const Saleway = {
    SHOPEAT: 1,
    PACKAGING: 2,
    TAEOUT: 3,
    PICKUP: 4,
    code: {
        1: '在店吃',
        2: '打包',
        3: '外卖',
        4: '自提'
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//餐厅标签
export const Restauran = {
    HUNANCUISINE: 1,
    CANTONESE: 2,
    SZECHUANCUISINE: 3,
    code: {
        1: '湘菜',
        2: '粤菜',
        3: '川菜',
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//发票分类
export const Invoice = {
    PLIANINVOICE: 1,
    SPECIALINVOICE: 2,
    code: {
        1: "增值税普通发票",
        2: "增值税专用发票",
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//企业认证状态
export const BUSINESS = {
    NO: 0,
    INAUTON: 1,
    AUTONED: 2,
    AUTONERR: 3,
    code: {
        0: '未认证',
        1: '认证中',
        2: '已认证',
        3: '认证失败',
//      1: '营业执照全称格式校验不通过',
//      2: '营业执照注册号格式校验不通过',
//      3: '营业执照期限校验不通过',
//      4: '营业执照期照片限校验不通过',    暂时不用
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};


//身份证验证状态
export const IDCODE = {
     NO: 0,
     INAUTON: 1,
     AUTONED: 2,
     AUTONERR: 3,
    code: {
        0: '未认证',
        1: '认证中',
        2: '已认证',
        3: '认证失败',
//      1: '真实姓名效验不通过',
//      2: '身份证号效验不通过',  暂时不用
//      3: '身份证照片效验不通过',
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//餐饮认证状态
export const DINING = {
 	 NO: 0,
     INAUTON: 1,
     AUTONED: 2,
     AUTONERR: 3,
    code: {
       0: '未认证',
        1: '认证中',
        2: '已认证',
        3: '认证失败',
//      1: '餐饮许可编号效验不通过',
//      2: '餐饮服务许可证照片效验不通过', 暂时不用
//      3: '确认书照片效验不通过',
//      4: '经营范围效验不通过',
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//商品管理 cfj

export const SaleStatus = {
    YES: 0,
    NO: 1,
    ALL: 2,
    code: {
        0: "上架",
        1: "下架",
        2: "全部"
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//size价格是否使用
export const SizeUse = {
    YES: 1,
    NO: 0,
    code: {
        0: "是",
        1: "否",
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//菜品类型
export const GoodType = {
    DISH: 1,
    ACCESSORY: 2,
    DRINK: 3,
    code: {
        1: "菜品",
        2: "配件",
        3: "酒水",
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};
//餐时 

export const Dinnertime = {
    MORN: 1,
    NOON: 2,
    EVEN: 3,
    NIGHT: 4,
    code: {
        1: '早市',
        2: '午市',
        3: '晚市',
        4: '夜宵'
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }

};

//认证状态

export const Certificationstatus = {
    UNAUTHEN: 1,
    INUNAUTHEN: 2,
    CERTIFIED: 3,
    code: {
        1: '未认证',
        2: '认证中',
        3: '已认证'
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//搜索框  判断是不是全选
export const chooseAll = {
    code: {
        0: '全部'
    }
};


export const priceType = {
    ORIGINAL: 1,
    DISCOUNT: 2,
    FESTIVAL: 4,
    VIP: 8,
    code: {
        1: "原价",
        2: "促销价",
        4: "节日价",
        8: "会员价",
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

export const sizeSpec = {
    BIG: 1,
    MIDDEL: 2,
    SMALL: 3,
    code: {
        1: "大份",
        2: "中份",
        3: "小份",
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//选择餐位费结算方式
export const seatPriceType = {
    NO: 0,
    PEOPLENUM: 1,
    FIXED: 2,
    PERCENTAGE: 3,
    code: {
        0: '无餐位费',
        1: '按就餐人数',
        2: '固定餐位费',
        3: '订单金额百分比',

    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

export const foodSaleWay = {
    PRESHOP: 1,
    SHOP: 2,
    PACKSELF: 3,
    TAKEOUT: 4,
    PACK: 5,
    code: {
        1: "预定在店吃",
        2: "非预定在店吃",
        3: "预定自提",
        4: "外卖",
        5: "打包外带"
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

//菜品管理是否有分量
export const foodSize = {
    YES: 2,
    NO: 1,
    code: {
        2: "是",
        1: "否",
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};

export const saleStatus = {
    NO: 0,
    CUSTOME: 1,
    WKKE: 2,
    code: {
        0: "不设置",
        1: "自定义",
        2: "按周期"
    },
    toString: function (code) {
        code = parseInt(code || 0);
        return this.code[code] || '未知[' + code + ']';
    }
};
