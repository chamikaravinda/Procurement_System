package com.procurement.procurement_server.model.order_request_mapper;

import com.procurement.procurement_server.datastore.ItemDataStore;
import com.procurement.procurement_server.model.order_level.Order;
import com.procurement.procurement_server.model.supplier_level.Item;
import com.procurement.procurement_server.model.user_level.Staff;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class OrderRequestMapper {


    private ArrayList<String []> orderList1;
    private String empId1;

    public ArrayList<String []> getOrderList1() {
        return orderList1;
    }

    public void setOrderList1(ArrayList<String []> orderList1) {
        this.orderList1 = orderList1;
    }

    public String getEmpId1() {
        return empId1;
    }

    public void setEmpId1(String empId1) {
        this.empId1 = empId1;
    }




    public Order convertToOrder() {
        List<Item> orderedItems = new ArrayList<>();
        for ( String [] item : orderList1) {
            Item tempitem = ItemDataStore.getSharedInstance().getUserFromStore(item[0]);
            tempitem.setQuantity(Integer.parseInt(item[1]));
            orderedItems.add(tempitem);
        }
        Staff user = new Staff();
        user.setStaffId(empId1);
        Order order = new Order();
        order.setItems(orderedItems);
        order.setPlacedUser(user);
        return order;
    }


}

