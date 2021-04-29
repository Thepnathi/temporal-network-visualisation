// This is the main file

async function main() {
    await initialiseData()
    startTime = getStartTimeRange(edges)
    endTime = getEndTimeRange(edges)
    updateSlider(startTime, endTime)
    initialiseTemporalGraphNetwork(startTime, endTime)
}

main()