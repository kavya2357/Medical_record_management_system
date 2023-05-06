import smartpy as sp

class marksheet(sp.Contract):
    def __init__(self):
        self.init(
            certificateMap=sp.map(),
        )

    @sp.entry_point
    def certificateDetails(self,params):
        #Roll number/application number
        rollno = params.rollno
        self.data.certificateMap[rollno] = sp.record(
        name = params.name, 
        fathersName=params.fathersName,
        age = params.age, 
        gender = params.gender, 
        PhoneNumber = params.PhoneNumber, 
        address = params.address,
        #Date of issue
        Datei = params.Datei,
        #organization name
        orgname=params.orgname,
        #Date of expiry
        Datee=params.Datee,
        #CGPA
        cgpa=params.cgpa,
        # Misc Comments
        comments = params.comments,
            
        )
@sp.add_test(name = "Creating Certificate")
def test():
    scenario = sp.test_scenario()

    user = sp.test_account("user")
    
    m1 = marksheet()
    scenario += m1
    
    scenario.h1("Creating a certificate")
    scenario += m1.certificateDetails(
        rollno = '20MIS0077', 
        name = 'Kavya Reddy', 
        fathersName='Venkateswar Reddy',
        age = '19', 
        gender = 'Female', 
        PhoneNumber = '9398556967', 
        address = 'Gachibowli Telangana',
        # Certificate Details
            #Date of issue 
            Datei ='12-02-2023',
            # Organization name
            orgname='coursera',
            #Date of Expiry
            Datee ='12-02-2049',
            cgpa='8.0',
            # Misc Comments
            comments ='No comments please'
    )