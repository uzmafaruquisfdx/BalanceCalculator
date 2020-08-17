public class BalanceCalculatorService {
    
    public class loadObject {
        @AuraEnabled
        public Integer id {get; set;}
        
        @AuraEnabled
        public string creditorName {get; set;}
        
        @AuraEnabled
        public string firstName {get; set;}

        @AuraEnabled
        public string lastName {get; set;}

        @AuraEnabled
        public double minPaymentPercentage {get; set;}  
        
        @AuraEnabled
        public double balance {get; set;}        
        
    }
    
    @AuraEnabled
    public static List<loadObject> loadInitialData () {
        List<loadObject> data = new List<loadObject>();
        
        StaticResource sr= [select id,body from StaticResource Where Name = 'BalanceData'];
        String allcontents = sr.body.toString();
        data = parseJSONbody(allcontents);
        
        return data;
        
    }
    
    public static List<loadObject> parseJSONbody (string jsonBody) {
        List<loadObject> listBalances = new List<loadObject>();
        List<loadObject> listProcessedBal = new List<loadObject>();
        
        listBalances = (List<loadObject>) system.JSON.deserialize(jsonBody, List<loadObject>.class);
        
        //PRocessing Percent fields
        for (loadObject LO: listBalances) {
            loadObject balanceREcord = new loadObject();
            
            balanceREcord = LO;
            balanceREcord.minPaymentPercentage = LO.minPaymentPercentage/100;
            listProcessedBal.add(balanceREcord);          
        }
        
        
        return listProcessedBal;
    }

}