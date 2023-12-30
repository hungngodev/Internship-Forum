function internshipFakeData() {
    function getRandomState() {
        const states = [
            { name: 'Alabama', abbreviation: 'AL' },
            { name: 'Alaska', abbreviation: 'AK' },
            { name: 'Arizona', abbreviation: 'AZ' },
            { name: 'Arkansas', abbreviation: 'AR' },
            { name: 'California', abbreviation: 'CA' },
            { name: 'Colorado', abbreviation: 'CO' },
            { name: 'Connecticut', abbreviation: 'CT' },
            { name: 'Delaware', abbreviation: 'DE' },
            { name: 'Florida', abbreviation: 'FL' },
            { name: 'Georgia', abbreviation: 'GA' },
            { name: 'Hawaii', abbreviation: 'HI' },
            { name: 'Idaho', abbreviation: 'ID' },
            { name: 'Illinois', abbreviation: 'IL' },
            { name: 'Indiana', abbreviation: 'IN' },
            { name: 'Iowa', abbreviation: 'IA' },
            { name: 'Kansas', abbreviation: 'KS' },
            { name: 'Kentucky', abbreviation: 'KY' },
            { name: 'Louisiana', abbreviation: 'LA' },
            { name: 'Maine', abbreviation: 'ME' },
            { name: 'Maryland', abbreviation: 'MD' },
            { name: 'Massachusetts', abbreviation: 'MA' },
            { name: 'Michigan', abbreviation: 'MI' },
            { name: 'Minnesota', abbreviation: 'MN' },
            { name: 'Mississippi', abbreviation: 'MS' },
            { name: 'Missouri', abbreviation: 'MO' },
            { name: 'Montana', abbreviation: 'MT' },
            { name: 'Nebraska', abbreviation: 'NE' },
            { name: 'Nevada', abbreviation: 'NV' },
            { name: 'New Hampshire', abbreviation: 'NH' },
            { name: 'New Jersey', abbreviation: 'NJ' },
            { name: 'New Mexico', abbreviation: 'NM' },
            { name: 'New York', abbreviation: 'NY' },
            { name: 'North Carolina', abbreviation: 'NC' },
            { name: 'North Dakota', abbreviation: 'ND' },
            { name: 'Ohio', abbreviation: 'OH' },
            { name: 'Oklahoma', abbreviation: 'OK' },
            { name: 'Oregon', abbreviation: 'OR' },
            { name: 'Pennsylvania', abbreviation: 'PA' },
            { name: 'Rhode Island', abbreviation: 'RI' },
            { name: 'South Carolina', abbreviation: 'SC' },
            { name: 'South Dakota', abbreviation: 'SD' },
            { name: 'Tennessee', abbreviation: 'TN' },
            { name: 'Texas', abbreviation: 'TX' },
            { name: 'Utah', abbreviation: 'UT' },
            { name: 'Vermont', abbreviation: 'VT' },
            { name: 'Virginia', abbreviation: 'VA' },
            { name: 'Washington', abbreviation: 'WA' },
            { name: 'West Virginia', abbreviation: 'WV' },
            { name: 'Wisconsin', abbreviation: 'WI' },
            { name: 'Wyoming', abbreviation: 'WY' }
        ];
    
        const randomIndex = Math.floor(Math.random() * states.length);
        return states[randomIndex];
    }
    
    // Example usage:
    const {name,abbreviation} = {...getRandomState()};
    function getRandomTechArea() {
        const techAreas = [
            'Web Development', 'Mobile App Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence',
            'Cybersecurity', 'Cloud Computing', 'DevOps', 'Database Administration', 'UI/UX Design',
            'Software Testing', 'Networking', 'IoT (Internet of Things)', 'Blockchain Development',
            'Game Development', 'AR/VR Development', 'Big Data', 'Bioinformatics', 'Embedded Systems'
        ];

        const randomIndex = Math.floor(Math.random() * techAreas.length);
        return techAreas[randomIndex];
    }

    const area = getRandomTechArea();

    function getRandomTechCompany() {
        const techCompanies = [
            'Google', 'Apple', 'Microsoft', 'Amazon', 'Facebook', 'IBM', 'Intel', 'Cisco', 'Oracle', 'Samsung',
            'HP (Hewlett-Packard)', 'Dell', 'Adobe', 'Nvidia', 'Sony', 'Tesla', 'Uber', 'Airbnb', 'Netflix', 'PayPal',
            'Salesforce', 'Reddit', 'SpaceX', 'Twitter', 'LinkedIn', 'Dropbox', 'Slack', 'Shopify', 'Zoom', 'TikTok'
            // Add more tech companies as needed
        ];

        const randomIndex = Math.floor(Math.random() * techCompanies.length);
        return techCompanies[randomIndex];
    }

    const company = getRandomTechCompany();
    const link = 'https://www.google.com/search?q=' + company + '+' + name;
    function generateInternshipTitle() {
        const adjectives = [
            "Innovative",
            "Advanced",
            "Dynamic",
            "Emerging",
            "Pioneering",
            "Cutting-edge",
            "Revolutionary",
            "Progressive",
            "Exploratory",
            "Experimental"
        ];

        const seasons = [
            "Spring",
            "Summer",
            "Autumn",
            "Winter"
        ];

        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const season = seasons[Math.floor(Math.random() * seasons.length)];

        return `${adjective} ${season}`;
    }

    const title = generateInternshipTitle() + ' ' + area + ' Intern at ' + company;

    function generateFakeInternshipDescription() {
        const industries = [
            "technology",
            "finance",
            "healthcare",
            "entertainment",
            "marketing",
            "education",
            "hospitality",
            "communications",
            "retail",
            "manufacturing"
        ];

        const adjectives = [
            "exciting",
            "challenging",
            "rewarding",
            "innovative",
            "dynamic",
            "engaging",
            "insightful",
            "cutting-edge",
            "creative",
            "collaborative"
        ];

        const tasks = [
            "developing new software solutions",
            "conducting market research",
            "analyzing data trends",
            "designing user interfaces",
            "creating marketing campaigns",
            "optimizing operational processes",
            "testing product functionalities",
            "building customer relationships",
            "implementing strategic plans",
            "supporting project management"
        ];

        const industriesIndex = Math.floor(Math.random() * industries.length);
        const adjectivesIndex = Math.floor(Math.random() * adjectives.length);
        const tasksIndex = Math.floor(Math.random() * tasks.length);

        const industry = industries[industriesIndex];
        const adjective = adjectives[adjectivesIndex];
        const task = tasks[tasksIndex];

        const internshipDescription = `This ${industry} internship offers an ${adjective} experience involving ${task}.`;

        return internshipDescription;
    }

    const description = generateFakeInternshipDescription();

    return {
        title: title,
        salary: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
        area: area,
        location: name,
        company: company,
        link: link,
        description: description + ' Note that this is randomly generated description.',
        state: abbreviation
    }
}
function prefillData(){
    const RandomData = internshipFakeData();
    document.getElementById("title").value = RandomData.title;
    document.getElementById("salary").value = RandomData.salary;
    document.getElementById("area").value = RandomData.area;
    document.getElementById("location").value = RandomData.location;
    document.getElementById("company").value = RandomData.company;
    document.getElementById("link").value = RandomData.link;
    document.getElementById("description").value = RandomData.description;
    document.getElementById("state").value = RandomData.state;

}
document.getElementById("fillRandom").addEventListener('click',prefillData);
function refreshData(){
    document.getElementById("title").value = '';
    document.getElementById("salary").value = '';
    document.getElementById("area").value ='';
    document.getElementById("location").value = '';
    document.getElementById("company").value = '';
    document.getElementById("link").value ='';
    document.getElementById("description").value ='';
    document.getElementById("state").value = '';
}
document.getElementById("refresh").addEventListener('click',refreshData);