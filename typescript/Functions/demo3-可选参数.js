function buildName(firstName, lastName) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
var result1 = buildName("Bob"); // works correctly now
var result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
var result3 = buildName("Bob", "Adams"); // ah, just right
