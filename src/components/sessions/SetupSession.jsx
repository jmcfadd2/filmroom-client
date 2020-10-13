import React from 'react'

export default function SetupSession() {
    return (
        <div>
            {/* <Paper className={classes.formPaper}>
                    <Typography variant={"h5"}>What kind of session?</Typography>
                    <form onSubmit={this.handleStart}>
                        <TextField
                            name="topic"
                            select
                            label="Sport"
                            variant="outlined"
                            
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={this.handleTopic}
                            fullWidth
                        >
                            <MenuItem value="Basketball">
                                Basketball
                            </MenuItem>
                            <MenuItem value="eSports">
                                eSports
                            </MenuItem>
                            <MenuItem value="Soccer">
                                Soccer
                            </MenuItem>
                            <MenuItem value="Football">
                                Football
                            </MenuItem>
                            <MenuItem value="Baseball">
                                Baseball
                            </MenuItem>
                        </TextField>
                        <TextField
                            name="type"
                            select
                            label="Session Type"
                            variant="outlined"
                            className={classes.textField}
                            onChange={this.handleType}
                            fullWidth
                        >
                            <MenuItem value="Skill Session">
                                Skill Session
                            </MenuItem>
                            <MenuItem value="Team Practice">
                                Team Practice
                            </MenuItem>
                            <MenuItem value="Team Game">
                                Team Game
                            </MenuItem>
                        </TextField>
                        <DrillTimeline />
                        <Fragment>
                        <AddDrill> Add Your Drills </AddDrill>
                        <CreateDrill> Create New Drill </CreateDrill>
                        </Fragment>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}
                        
                        >
                            Start Session
                    {loading && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progressSpinner}
                                />
                            )}
                        </Button>
                    </form>
                </Paper> */}
        </div>
    )
}
