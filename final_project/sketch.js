/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

// background vars
var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

var game_score;
var flagpole;
var lives;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    startGame();
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    push();
    translate(scrollPos, 0);

	// Draw mountains.
    drawMountains();
    
	// Draw clouds.
    drawClouds();
    
	// Draw trees.
    drawTrees();
	// Draw canyons.
    for(var i=0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }
	// Draw collectable items.
    for(var i=0; i < collectables.length; i++)
    {   
        
        if(collectables[i].isFound == false)
        {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);            
        }
        
        
    }
    renderFlagpole();
    checkPlayerDie();
    
    pop();
    drawLives();
	// Draw game character.
	
	drawGameChar();
    fill(255);
    noStroke();
    
    text("Crystals Collected: " + game_score,20,20);
    text("Lives: " , 20,40);
    
    //check game status
    if(lives <1){
        fill(255,0,0);
        textSize(40);
        text("Game over.\nPress space to continue", width/2, height/3);
        textSize(12);
        gameChar_y += 20;
        return;
    }
    if(flagpole.isReached){
        fill(0);
        textSize(40);
        text("Level complete.\nPress space to continue", width/2, height/3);
        textSize(12);
        gameChar_y = floorPos_y;
        return;
    }
    
    //---------------------------------------------------
    // GAME LOGIC
    //---------------------------------------------------
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 1.5;
		}
		else
		{
			scrollPos += 1.5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 1.5;
		}
		else
		{
			scrollPos -= 1.5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
    if(gameChar_y < floorPos_y){
        //console.log("personaje  en el aire");
        gameChar_y += 1;
        isFalling = true;
    }else{
        isFalling = false;
    }
    // Logic to make the game character fall of a canyon
    if(isPlummeting){
        gameChar_y +=5;
        if(gameChar_y > height){
            
            isPlummeting =false;
        }
    }
    if(flagpole.isReached == false)
    {
        checkFlagpole();
    }

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

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
        if(gameChar_y == floorPos_y && isPlummeting == false)
        {
           gameChar_y -=100 ;
        }

    }
    
    // REstart game
    if(flagpole.isReached || lives <0){
        if(keyCode == 32){
            lives = 3;
            startGame();
        }
    }

}

function keyReleased()
{
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


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
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

}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
        fill(255);
        ellipse(clouds[i].pos_x, clouds[i].pos_y, 55, 55);
        ellipse(clouds[i].pos_x + 25, clouds[i].pos_y, 35, 35);
        ellipse(clouds[i].pos_x + 45, clouds[i].pos_y, 25, 25);
        clouds[i].pos_y+= random(-1,1);
        clouds[i].pos_x-=1; //simulate east wind
        recycle_cloud = abs(clouds[i].pos_x - gameChar_x) > width/2;
        if(recycle_cloud)
        {
            clouds[i].pos_x = gameChar_x + width/2;
        }
        
    }
}

// Function to draw mountains objects.
function drawMountains()
{
    // Draw mountains.
    for(var i = 0; i < mountains.length; i++)
    {
        fill(100);
        triangle(mountains[i].pos_x - mountains[i].height/2, floorPos_y,
                mountains[i].pos_x,floorPos_y - mountains[i].height,
                mountains[i].pos_x + mountains[i].height/2, floorPos_y);
    }
    
}

// Function to draw trees objects.
function drawTrees()
{
	// Draw trees.
    for(var i = 0; i < trees_x.length; i++)
    {
        fill(100,50,0);
        rect(75 + trees_x[i], -200/2 + floorPos_y, 50, 200/2);
        fill(0,100,0);
        triangle(trees_x[i] + 25, -200/2 + floorPos_y,
                trees_x[i] + 100, -200 + floorPos_y,
                trees_x[i] +175, -200/2 + floorPos_y);
        
        triangle(trees_x[i] + 25, -200/4 + floorPos_y,
                trees_x[i] + 100, -200*3/4 + floorPos_y,
                trees_x[i] +175, -200/4 + floorPos_y);
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    //mountain to the left
    fill(153,102,51);
    triangle(t_canyon.top_part_left_a,floorPos_y,
             t_canyon.top_part_left_b -10,floorPos_y,
             t_canyon.bottom_part_left,800);

    //lake
    fill(62,209,199);
    quad(t_canyon.top_part_left_a -10,floorPos_y,
         t_canyon.top_part_right_a,floorPos_y,
         t_canyon.bottom_part_right,576,
         t_canyon.bottom_part_left,576);
    
  
    //tides
    stroke(255);
    strokeWeight(3);
    beginShape();
    vertex(t_canyon.top_part_right_a - 25 + random(-1,1) , floorPos_y+20);
    vertex(t_canyon.top_part_right_a - 10 + random(-1,1), floorPos_y+40);
    vertex(t_canyon.top_part_right_a - 25 + random(-1,1), floorPos_y+60);
    vertex(t_canyon.top_part_right_a - 10 + random(-1,1), floorPos_y+80);
    endShape();
    
    beginShape();
    vertex(t_canyon.top_part_left_a + random(-1,1), floorPos_y + 60 );
    vertex(t_canyon.top_part_left_a+10 + random(-1,1), floorPos_y + 80);
    vertex(t_canyon.top_part_left_a + random(-1,1), floorPos_y +100);
    vertex(t_canyon.top_part_left_a+10 + random(-1,1), floorPos_y + 120);
    endShape();

    noStroke();
    //mountain to the right
    fill(153,102,51);
    triangle(t_canyon.top_part_right_a,floorPos_y,
             t_canyon.top_part_right_b+10,floorPos_y,
             t_canyon.bottom_part_right,800);   

}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    //console.log(isPlummeting);
    //console.log(gameChar_y);
    if(t_canyon.top_part_left_b < gameChar_world_x && gameChar_world_x < t_canyon.top_part_right_b && floorPos_y <= gameChar_y)
    {
        isPlummeting = true;
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
     //ruby
    fill(240,0,0);
    quad(t_collectable.pos_x-10, t_collectable.pos_y,
         t_collectable.pos_x, t_collectable.pos_y -t_collectable.size/2,
         t_collectable.pos_x+10, t_collectable.pos_y,
         t_collectable.pos_x, t_collectable.pos_y +t_collectable.size/2);
    //shiny center circle
    fill(218,225,19,240);
    ellipse(t_collectable.pos_x,t_collectable.pos_y,t_collectable.size/3);
    noStroke();
    
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x, gameChar_y, t_collectable.pos_x, t_collectable.pos_y)<41)
    {
        t_collectable.isFound = true;
        game_score +=1;
    }
}

//---------------------------------------
// Flagpole render and check functions
//---------------------------------------

function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(120);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(135,206,250);
    noStroke();
    if(flagpole.isReached)
    {
        rect(flagpole.x_pos, floorPos_y - 250, 70, 50);
        fill(255);
        rect(flagpole.x_pos, floorPos_y - 235, 70, 20);
        fill(255,255,0);
        ellipse(flagpole.x_pos+70/2, floorPos_y - 225,15);
    }else
    {
        rect(flagpole.x_pos, floorPos_y - 50, 70, 50);
        fill(255);
        rect(flagpole.x_pos, floorPos_y - 35, 70, 20);
        fill(255,255,0);
        ellipse(flagpole.x_pos+70/2, floorPos_y - 25,15);
    }

    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);
    if(d < 15)
    {
        flagpole.isReached = true;
    }
}

//---------------------------------------------------
// Player death and startGame functions
//---------------------------------------------------

function checkPlayerDie()
{
    if(gameChar_y > height){
        lives -=1;
        if(lives>0){
            startGame();
        }
    }
        

}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
    clouds = [
        {pos_x:150, pos_y:100},
        {pos_x:400, pos_y:150},
        {pos_x:900, pos_y:120}];
    
    mountains = [{pos_x: 800, height:200},
            {pos_x: 900, height:300},
            {pos_x: 1000, height:150}];
    
    trees_x = [100, 300, 500, 1000];
    
    canyons = [
        {
        top_part_left_a:100,
        top_part_left_b:60,
        bottom_part_left:90,
        top_part_right_a:140,
        top_part_right_b:160,
        bottom_part_right:150
        },
        {
        top_part_left_a:1400,//500
        top_part_left_b:1360,
        bottom_part_left:1390,
        top_part_right_a:1440,
        top_part_right_b:1460,
        bottom_part_right:1450
        }
        ];
    
    collectables = [
        {pos_x: 100, pos_y: floorPos_y - 40, size: 50, isFound:false},
        {pos_x: 1300, pos_y: floorPos_y - 40, size: 50, isFound:false}
    ];
    
    game_score = 0;
    flagpole = {isReached: false, x_pos:1550};
}

function drawLives(){
    if(lives>0){
        for(var i = 0; i<lives; i++)
        {
            fill(255,0,0);
            ellipse(60+i*20,36,15);
        }
    }
}
