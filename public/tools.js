function addNameValues(list)
{
  var values = {};
  for(name in list)
  {
    values[list[name]] = name;
  };
  
  for(value in values)
  {
    list[value] = values[value];
  };
};

