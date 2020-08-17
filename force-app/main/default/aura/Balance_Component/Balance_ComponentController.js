({
    onLoad: function (component, event, helper) {
        
        //replace by APex and static resource
        
        var action = component.get("c.loadInitialData");
        action.setCallback(this,function(response){
            $A.enqueueAction(component.get('c.hideSpinner'));

            var state = response.getState();
            console.log(state);
            
            if (component.isValid() && state === "SUCCESS") {
                
                component.set("v.balList",response.getReturnValue()); 
                
            } else if (state === "INCOMPLETE") {
                // do something
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }                
            } 
            
        });
        $A.enqueueAction(action);//Invoke the apex method
        $A.enqueueAction(component.get('c.showSpinner'));
        
        //component.set("v.balList",data); 
        component.set("v.demoColumns", [
            { label: 'Creditor', fieldName: 'creditorName', type: 'string' },
            { label: 'First Name', fieldName: 'firstName', type: 'string' },
            { label: 'LastName', fieldName: 'lastName', type: 'string' },
            { label: 'Min Pay%', fieldName: 'minPaymentPercentage', type: 'percent', cellattributes: {}, typeAttributes: { minimumFractionDigits: '2' } },
            { label: 'Balance', fieldName: 'balance', type: 'currency' }
            
        ]);
        component.set("v.totalNumberOfRows","v.balList".length+1); 
        component.set("v.spinner",false);        
    },
    
    handleSelect : function(component, event, helper) {
        var selectedRows  = event.getParam('selectedRows'); 
        component.set("v.selectedRowsInfo",selectedRows);
        
        var tc = 0;
        var setRows = component.get("v.balList");
        for ( var i = 0; i < selectedRows.length; i++ ) {
            
            console.log('*** here is'+selectedRows[i].balance);
            tc += selectedRows[i].balance;           
        }
        
        component.set("v.total", tc);
        component.set("v.selectedRowsCount",selectedRows.length);
        
    },
    doDelete : function(component, event, helper) {
        console.log('*** Delete');
        var selectedRows = component.get("v.selectedRowsInfo");
        
        console.log('*** selectedRows'+JSON.stringify(selectedRows));
        var setRows = component.get("v.balList");
        
        for ( var i = 0; i < selectedRows.length; i++ ) {
            
            console.log(setRows.indexOf(selectedRows[i]));
            setRows.splice(setRows.indexOf(selectedRows[i]), 1);            
        }
        
        //updated rows
        console.log('*** updated rows'+JSON.stringify(setRows));
        
        component.set("v.selectedRowsCount",selectedRows.length);
        component.set("v.balList",""); 
        component.set("v.balList",setRows); 
        component.set("v.totalNumberOfRows", setRows.length);
        
    },
    addRow : function (component, event, helper) {
        console.log('*** Add');
        
        // this fetches the existing data as rendered in datatable
        var myData = component.get("v.balList"); 
        console.log('*** brefore Add'+JSON.stringify(myData));
        
        //number generator adding static data
        myData.push(
            {                
                id: component.get("v.balList").length+1,
                creditorName: "Navy FCU",
                firstName: "",
                lastName: "",
                balance: 3000.00
            }
        );
        component.set("v.balList", "");  
        
        console.log('*** after Add'+JSON.stringify(myData));
        component.set("v.balList", myData);  
        
        // now add the new array back to the attribute, so that it reflects on the component
        component.set("v.balList", myData);  
        component.set("v.totalNumberOfRows", myData.length);
        
    },
    showSpinner: function(component){
        component.set("v.spinner",true);
    },
    hideSpinner: function(component){
        component.set("v.spinner",false);
    }  
})