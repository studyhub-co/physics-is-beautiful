import React, { useEffect, useState } from 'react'
import { Sheet } from '../../components/Sheet'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  root: {
    maxWidth: '10rem',
  },
  media: {
    height: '100%',
  },
})

const AboutView = () => {
  const classes = useStyles()

  return (
    <Sheet>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={6}>
          <div style={{ marginBottom: '.25rem' }}>
            <h1
              style={{
                color: '#0fa5ff',
                // fontFamily: 'Tw Cen MT hinted', TODO it's using only on the main page, do we need this?
                textAlign: 'center',
              }}
            >
              ABOUT US
            </h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <h2 style={{ textAlign: 'center' }}>
            Let’s be honest. Physics isn’t easy.
          </h2>
        </Grid>
        <Grid item xs={6}>
          <h3 style={{ textAlign: 'center' }}>
            Physics Is Beautiful is a free, interactive, easy way to learn
            physics for people of all backgrounds.
          </h3>
        </Grid>
        <Grid item xs={6}>
          <br />
          <p style={{ textAlign: 'justify' }}>
            Nicolas Scozzaro, Michael Darcy and Hiran Wijesinghe are dedicated
            to making physics more interactive, accessible and fun. They have
            started "Physics is Beautiful," an app of gamified physics lessons
            that cover standard curriculum in an interactive way. Think of it
            like Duolingo or CodeAcademy but for physics.
          </p>
          <p style={{ textAlign: 'justify' }}>
            They are making physics more efficient and enjoyable by eliminating
            the dry textbooks and problem sets from the equation. With the $2000
            in funding provided through winning a{' '}
            <a
              href="https://techhub.osu.edu/news/2016/11/16/and-grant-goes-2016-student-project-grant-winners"
              target={'_blank'}
              rel="noreferrer"
            >
              Tech Hub Tech Grant
            </a>
            , they are developing a web app that will offer free, quality
            physics instruction to be used in classes around the world.
          </p>
          <p style={{ textAlign: 'justify' }}>
            They built the initial site and implemented the platform as part of
            the homework in the summer intro physics course Physics 1200 at OSU
            during summer 2016. In early 2017 using the Tech Hub funding they
            hired Damian Hites to put the platform on a solid foundation. Damian
            is an experienced web developer who has worked for startups such as
            Rdio and MakeSpace, and he rebuilt the platform using a Python web
            framework called Django and Facebook's front end library called
            React.js. Neil Chowdhury joined the team in the summer of 2018 to
            develop a mobile app and improve the website's functionality.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Their ultimate goal is to enable people to learn physics in a
            fraction of the time than it takes today, and enjoy the learning
            process much more. Their aim is for their content to be thorough
            enough that students may eventually be able to pass the AP physics
            exam or even college courses by using only the app.
          </p>
          <p style={{ textAlign: 'justify' }}>
            The physics curriculum currently covers (listed in order) vectors,
            motion diagrams, position-, velocity- and acceleration versus time
            graphs, Newton's Laws, forces, and free-body diagrams. The structure
            is a series of lessons that consist of questions that build on one
            another, sometimes referred to as an "inductive-chain." After a few
            lessons learning new material, there are "game-review" lessons
            reviews the previous lessons in a game format which requires speed
            and accuracy to beat. They are dedicated to developing new lessons
            and improving current lessons, to allow people to learn physics as
            efficiently as possible.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Physics is Beautiful was successfully used as part of the required
            homework in The Ohio State University's summer intro physics course
            (physics 1200) during the summer of 2016. It can also be used by
            high school physics teachers as a supplement for algebra &
            calculus-based physics (AP). Or it can be used just for fun!
          </p>
          <p style={{ textAlign: 'justify' }}>
            We recently{' '}
            <a
              target={'_blank'}
              href="https://techhub.osu.edu/news/2017/07/27/physics-beautiful-app-released"
              rel="noreferrer"
            >
              opened Physics is Beautiful to the public
            </a>
            .
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt="Nicolas Scozzaro"
                image={require('./images/about/nicolas.jpg')}
                title="Nicolas Scozzaro"
              />
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={'https://www.linkedin.com/in/nscozzaro'}
                target="_blank"
              >
                Nicolas Scozzaro
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt="Michael Darcy"
                image={require('./images/about/Darcy.jpg')}
                title="Michael Darcy"
              />
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={'https://www.linkedin.com/in/mike-darcy-610b6640'}
                target="_blank"
              >
                Michael Darcy
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt="Hiran Wijesinghe"
                image={require('./images/about/hiran.png')}
                title="Hiran Wijesinghe"
              />
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={'https://www.linkedin.com/in/webfarer'}
                target="_blank"
              >
                Hiran Wijesinghe
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt="Dom Hites"
                image={require('./images/about/domhites.jpg')}
                title="Dom Hites"
              />
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={'https://www.linkedin.com/in/damianhites'}
                target="_blank"
              >
                Dom Hites
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt="Neil Chowdhury"
                image={require('./images/about/Neil.jpg')}
                title="Neil Chowdhury"
              />
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={'https://www.linkedin.com/in/neilchowdhury98'}
                target="_blank"
              >
                Neil Chowdhury
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Sheet>
  )
}

export default AboutView
