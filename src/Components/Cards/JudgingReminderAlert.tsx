import React from "react";

export const JudgingReminderAlert = (props: { songByTheArtist: string }) => (
    <div className={"judging-reminder-alert-container"}>
        <p style={{textAlign: "left", paddingBottom: "16px"}}>
            {
                `
                            You are currently writing comments about the song ${props.songByTheArtist}.
                            Be sure to save your comments often! If you change to a different band before saving, you will lose any unsaved changes.
                            `
            }
        </p>
        <p style={{textAlign: "left", paddingBottom: "16px"}}>
            {
                `
                            Please be thoughtful and thorough with your comments for ALL of the entrants.
                            `
            }
        </p>
        <p className={"judging-reminder-alert"}>
            Reminder: You are not providing feedback on the recording quality of submissions. Please focus
            on the music, lyrics, performance, etc.
        </p>
    </div>);