export default [
  {
    icon: "fas fa-info-circle",
    description: `#### Circular gauge
If you go to skills panel, to display modal, you have to click on line's title. You will see many circular gauges which represent each technology I mentionned in skills list. But there is a problem, once modal is displayed, some circular deasn't start properly, ie going from 0 to its value. It start from 100 to decrease to its value.  
The weird thing is I use svg dashoffset and dasharray to represent the "filling effect". If dashoffset/dasharray's value is same as svg component, the stroke will be "blank". The more dashoffset/dasharray decreases, the more stroke takes some lenght. In a consecutive update, this decrease gives a filling effect, which is the goal.  
It seems that at first rendering, stroke dashoffset/dasharray is 0 which is default value given to dashoffset/dasharray via styled-components. If you close modal and open it again, things go as expected.  
I must provide as first value for dashoffset/dasharray the svg length.`
  }
];
