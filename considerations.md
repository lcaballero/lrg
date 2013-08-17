Considerartions:
================

1. Validation of the student name before being filled in.
2. Possible values for the grade?  If the min is 0 and the max is 100
then the possible values are [0-100] with extra credit being a separate field.
3. If extra credit is configuration then the actual range will be from
[0..(max+extra)].

Nice to haves (given my time constraints):
==========================================
Statistics JS Package to calculate some interesting scoring stats.
Graphic depiction of the distribution
Validation of the form given default names.

Requirements:
=============
[DONE] The list shall support CRUD operations on student names and his or her associated grade

The list shall support in-line editing of student names and grades, such that changing a test score and pressing enter (or clicking away from the input field) updates the model

Statistics shall automatically update after CRUD operations are performed

The list shall validate user input

[DONE] Students in the list with a grade < 65 shall be highlighted to indicate a failing grade

Dependencies:
=============
localStorage:
	IE v8+, FF v21+, Chrome v27+, Safari v5.1+, Opera v15+, iOS Safari v3.2+,
	Opera Mini (none), Android Browser v2.1+, Blackbeary Browser v7.0