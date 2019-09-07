/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyons
    fill(101,67,33);
    rect(width/4, floorPos_y, 100, height - floorPos_y);
    rect(width/1.7, floorPos_y, 100, height - floorPos_y);
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        	//Jumping to the left
        //Add your code here ...
            //head
        fill(200,150,150);
        ellipse(gameChar_x, gameChar_y-55,35);

        //right leg
        fill(0);
        triangle(gameChar_x - 7, gameChar_y - 25,
             gameChar_x, gameChar_y - 25,
             gameChar_x -15, gameChar_y-10);

        //right arm
        rect(gameChar_x -15, gameChar_y - 40, 10, 2);

        //Body
        fill(255,0,0);
        rect(gameChar_x - 8, gameChar_y-40, 16,20);
        //left arm
        fill(0);
        triangle(gameChar_x, gameChar_y - 35,
             gameChar_x + 7, gameChar_y - 35,
             gameChar_x + 15, gameChar_y-30); 

        //left leg
        triangle(gameChar_x, gameChar_y - 25,
            gameChar_x + 7, gameChar_y - 25,
            gameChar_x +15, gameChar_y-10);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        	//Jumping right

        //Add your code here ...
        //head
        fill(200,150,150);
        ellipse(gameChar_x, gameChar_y-55,35);

        //right leg
        fill(0);
        triangle(gameChar_x, gameChar_y - 25,
            gameChar_x + 7, gameChar_y - 25,
            gameChar_x +15, gameChar_y-10);
        //left arm
        fill(0);
        rect(gameChar_x +5, gameChar_y - 40, 10, 2);    
        //Body
        fill(255,0,0);
        rect(gameChar_x - 8, gameChar_y-40, 16,20);
        //rigth arm
        fill(0);
        triangle(gameChar_x - 7, gameChar_y - 35,
             gameChar_x, gameChar_y - 35,
             gameChar_x -15, gameChar_y-30);
        //left leg
        triangle(gameChar_x - 7, gameChar_y - 25,
             gameChar_x, gameChar_y - 25,
             gameChar_x -15, gameChar_y-10);


	}
	else if(isLeft)
	{
		// add your walking left code
        	//Walking, turned left ***************************
        //head
        //console.log("inside 'isLeft'");
        fill(200,150,150);
        ellipse(gameChar_x, gameChar_y-50, 35);

        //right leg
        fill(0);
        triangle(gameChar_x - 7, gameChar_y - 10,
             gameChar_x, gameChar_y - 10,
             gameChar_x -15, gameChar_y+5);

        //body
        fill(255,0,0);
        rect(gameChar_x-8, gameChar_y-35, 16,30);

        //left leg
        fill(0);
        triangle(gameChar_x, gameChar_y - 10,
            gameChar_x + 7, gameChar_y - 10,
            gameChar_x +15, gameChar_y+5);

	}
	else if(isRight)
	{
		// add your walking right code
        	//Walking, turned right
        //head
        //console.log("inside isRight");
        fill(200,150,150);
        ellipse(gameChar_x, gameChar_y-50, 35);

        //right leg
        fill(0);
        triangle(gameChar_x, gameChar_y - 10,
            gameChar_x + 7, gameChar_y - 10,
            gameChar_x +15, gameChar_y+5);

        //body
        fill(255,0,0);
        rect(gameChar_x-8, gameChar_y-35, 16,30);

        //left leg
        fill(0);
        triangle(gameChar_x - 7, gameChar_y - 10,
             gameChar_x, gameChar_y - 10,
             gameChar_x -15, gameChar_y+5);
    }
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        	//Jumping facing forwards ********************************
        //head
        fill(200,150,150);
        ellipse(gameChar_x, gameChar_y-55,35);

        //Body
        fill(255,0,0);
        rect(gameChar_x - 13, gameChar_y-40, 26,20);

        //legs
        fill(0);
        rect(gameChar_x -15,gameChar_y -25,10,10);
        rect(gameChar_x +5, gameChar_y -25, 10, 10);

        //arms out
        fill(0);
        rect(gameChar_x -20, gameChar_y - 40, 10, 5);
        rect(gameChar_x +10, gameChar_y - 40, 10, 5);

	}
	else
	{
		// add your standing front facing code
        //Standing, facing frontwards ************************
        //head
        fill(200,150,150);
        ellipse(gameChar_x, gameChar_y-50, 35);

        //body
        fill(255,0,0);
        rect(gameChar_x-13, gameChar_y-35, 26,30);

        //left leg
        fill(0);
        rect(gameChar_x -15, gameChar_y - 5, 10, 10);
        rect(gameChar_x +5, gameChar_y - 5, 10, 10);

	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if(isLeft == true)
    {
        gameChar_x -= 1;
        //console.log("WALKING LEFT ");
    }
        
    if(isRight == true)
    {
        gameChar_x += 1;
    }
    
    // check if game character is above ground level
    if(gameChar_y < floorPos_y){
        //console.log("personaje  en el aire");
        gameChar_y += 1;
        isFalling = true;
    }else{
        isFalling = false;
    }
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
    console.log(keyCode);
    if(keyCode ==37)
    {
        //console.log("left arrow");
        isLeft = true;
    }
    else if(keyCode == 39)
    {
        //console.log("right arrow")
        //console.log(keyCode);
        isRight = true;
    }
    else if(keyCode == 32) // jump command
    {
        if(gameChar_y == floorPos_y)
        {
           gameChar_y -=100 ;
        }

    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	//console.log("keyReleased: " + key);
	//console.log("keyReleased: " + keyCode);
    if(keyCode ==37)
    {
        //console.log("left arrow unpressed");
        isLeft = false;
    }
    else if(keyCode == 39)
    {
        //console.log("right arrow unpressed")
        isRight = false;
    }
}
