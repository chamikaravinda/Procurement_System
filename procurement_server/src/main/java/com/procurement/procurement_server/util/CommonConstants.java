package com.procurement.procurement_server.util;

public class CommonConstants {

	/*------------------------------Cross Origins----------------------------*/
	public static final String ORIGINS = "*";
	public static final String ALLOWED_HEADERS = "*";
	/*-----------------------------------------------------------------------*/
	
    public static final int GET_USER_REQUEST = 25;
    public static final int ADD_USER_REQUEST = 26;
    public static final int GET_AVAILABLE_SUPPLIER_ITEMS = 27;
    public static final int GET_ALL_USERS = 29;
    public static final int DELETE_SPECIFIC_USER = 30;
    public static final int GET_ALL_ORDERS = 31;
    
    public static final int ADD_ORDER_REQUEST = 80;
    public static final int GET_ALL_ORDERS_REQUEST = 81;
    public static final int GET_ORDER_BY_ID_REQUEST = 82;
    public static final int UPDATE_ORDER_REQUEST = 83;
    public static final int DELETE_ORDER_REQUEST = 84;
    public static final int GET_ORDERS_BY_STATUS = 85;
    public static final int APPROVE_ORDER_REQUEST = 86;
    public static final int DECLINE_ORDER_REQUEST = 87;
   

    public static final int ADD_SITE_REQUEST = 70;
    public static final int GET_STAFF_BY_TYPE =71; 
    public static final int GET_ALL_SITE_REQUEST = 72;
    
    public static final String USER_TYPE_PROCUREMENT_MANAGER = "Procurement Manager";
    public static final String USER_TYPE_SITE_MANAGER = "Site Manager";
    public static final String USER_TYPE_SUPERVISOR = "Supervisor";
    public static final String USER_TYPE_FINANCE_EMPLOYEE = "Finance";

    /*---------------------Order management---------------------------------*/
    public static final long ORDER_LIMIT = 100000;
    /*----------------------------------------------------------------------*/
    
    
    
    /*---------------------item management---------------------------------*/
    public static final int ADD_ITEM_REQUEST = 1001;
    public static final int GET_ALL_ITEM = 1002;
    public static final int GET_ITEM_BY_QTY = 1003;
    public static final int GET_ITEM_BY_NON_QTY = 1004;
    public static final int UPDATE_ITEM_REQUEST = 1005;
    /*----------------------------------------------------------------------*/

    /*-------------------Mapping-----------------------*/
    public static final String MAPPING_MAIN = "/api/construction";
    public static final String MAPPING_ADD_ORDER = "/order/add";
    public static final String MAPPING_GET_ALL_ORDERS = "/order/all";
    public static final String MAPPING_UPDATE_ORDER = "/order/update";
    public static final String MAPPING_DELETE_ORDER = "/order/delete";
    public static final String MAPPING_GET_ORDER_BY_STATUS = "/order/{status}";
    public static final String MAPPING_APPROVE_ORDER = "/order/approve";
    public static final String MAPPING_DECLINE_ORDER = "/order/decline";
   
    /*-------------------------------------------------*/
}
