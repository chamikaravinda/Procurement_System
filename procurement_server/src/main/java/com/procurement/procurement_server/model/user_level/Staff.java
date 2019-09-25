package com.procurement.procurement_server.model.user_level;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**Cannot add addStaff()
 *   searchViewStaff()
 *   updateStaff()
 *   deleteStaff methods here as in the class diagram
 *   those should be added to a staff controllers class,
 *   in this implementation we have created a datastore for that
 ***/

@Document(collection = "staff")
public class Staff {

    @Id
    private String staffId;
    private String firstName;
    private String lastName;
    private Object type;


    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Object getType() {
        return type;
    }

    public void setType(Object type) {
        this.type = type;
    }
}
