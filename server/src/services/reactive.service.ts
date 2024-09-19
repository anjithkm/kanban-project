import { BehaviorSubject } from 'rxjs'


class reactiveService {
    
    private SUBJECT : any

    constructor(initialValue:any){
  
      // Create a BehaviorSubject with an initial value
      this.SUBJECT=  new BehaviorSubject(initialValue);
  
   }

    // Function to get the current value of the reactive variable
    public getValue(){
    return this.SUBJECT.getValue();
    } 

    // Function to set a new value to the reactive variable
    public setValue(newValue:any){
    return this.SUBJECT.next(newValue);
    } 

    // Function to set a new value to the reactive variable
    public subscribeToChanges(callback:any){
        return this.SUBJECT.subscribe(callback);
    } 


}


export default reactiveService;