# Probability Distribution Tool
# Probability Distribution Visualizer

This Shiny application provides an interactive platform to visualize and simulate various probability distributions. It allows users to select a probability distribution, customize its parameters, and view the theoretical distribution along with simulated data. The application also calculates and displays key statistics such as mean, standard deviation, median, skewness, and kurtosis of the simulated data.

## Features

- **Select from 13 probability distributions**: Normal, Binomial, Poisson, Exponential, Gamma, Uniform, Beta, Chi-Square, Lognormal, Weibull, Cauchy, Student's T, and F Distribution.
- **Customizable parameters**: Each distribution has specific parameters that can be adjusted, such as mean, standard deviation, number of trials, probability of success, lambda, shape, scale, etc.
- **Visualizations**: The application generates plots for both the theoretical distribution and the simulated data.
- **Statistical summaries**: Display key statistics of the simulated data.
- **Data download**: Download the simulated data as a CSV file.

## Installation

1. Ensure that you have R and RStudio installed on your system.
2. Install the required packages using the following commands in your R console:

    ```R
    install.packages(c("shiny", "shinydashboard", "ggplot2", "extraDistr", "shinyjs", "moments"))
    ```

3. Download the application code and save it as `app.R`.

## Usage

1. Open `app.R` in RStudio.
2. Click the "Run App" button in the upper right corner of the script editor.
3. The application will launch in a new window.

## UI Components

### Sidebar

- **Distribution Selection**: Dropdown menu to select the desired probability distribution.
- **Parameter Inputs**: Numeric inputs for the parameters of the selected distribution.
- **Simulations**: Numeric input to set the number of simulations.
- **Bins**: Numeric input to set the number of histogram bins.
- **Download Data**: Button to download the simulated data as a CSV file.

### Main Panel

- **Theoretical Distribution Plot**: Displays the theoretical probability density function (PDF) or probability mass function (PMF) of the selected distribution.
- **Simulation Results Plot**: Displays a histogram of the simulated data.
- **Statistical Summaries**: Value boxes showing the mean, standard deviation, median, skewness, and kurtosis of the simulated data.

## Server Logic

The server logic handles:

- **Reactive UI elements**: Shows or hides parameter inputs based on the selected distribution.
- **Data generation**: Generates simulated data based on the selected distribution and parameters.
- **Theoretical distribution calculation**: Calculates the theoretical PDF or PMF of the selected distribution.
- **Plot rendering**: Renders the plots for theoretical and simulated data.
- **Statistical summary calculation**: Calculates and displays the mean, standard deviation, median, skewness, and kurtosis of the simulated data.
- **Data download**: Allows the user to download the simulated data as a CSV file.
