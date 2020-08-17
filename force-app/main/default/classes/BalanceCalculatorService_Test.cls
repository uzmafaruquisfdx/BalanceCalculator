@isTest
private class BalanceCalculatorService_Test {
    @isTest static void testloadInitialData () {
        
        List<BalanceCalculatorService.loadObject> data = new List<BalanceCalculatorService.loadObject>(); 
        List<BalanceCalculatorService.loadObject> processedData = new List<BalanceCalculatorService.loadObject>(); 
        
        processedData = BalanceCalculatorService.loadInitialData();
        
         System.assertEquals(processedData .size(), 10);
         
         //processedData = BalanceCalculatorService.parseJSONbody(data);
         
         for (BalanceCalculatorService.loadObject LO : processedData ) {
             System.Assert(LO.minPaymentPercentage <= 1) ;
         }
        //System.assertEquals(1, i);
 


        // Perform some verification
    }
        @isTest static void testParseJSON () {

        BalanceCalculatorService.loadObject data = new BalanceCalculatorService.loadObject();
        List<BalanceCalculatorService.loadObject> processedData = new List<BalanceCalculatorService.loadObject>();         
         
        data.id = 1;
        data.creditorName = 'CBNA';
        data.firstName = 'Uzma';
        data.lastName = 'Faruqui';
        data.minPaymentPercentage = 2.00;
        data.balance = 1363.00;
       
        processedData = BalanceCalculatorService.loadInitialData();
        
         System.assertEquals(processedData .size(), 10);

    }
}