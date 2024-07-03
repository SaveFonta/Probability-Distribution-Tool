library(shiny)
library(shinydashboard)
library(ggplot2)
library(extraDistr)
library(shinyjs)
library(moments) 

# Define UI
ui <- dashboardPage(
  dashboardHeader(title = "Probability Distribution Visualizer"),
  dashboardSidebar(
    useShinyjs(),
    selectInput("distribution", "Choose Distribution:", 
                choices = c("Normal", "Binomial", "Poisson", "Exponential", "Gamma", "Uniform", 
                            "Beta", "Chi-Square", "Lognormal", "Weibull", "Cauchy", "Student's T", 
                            "F Distribution")),
    div(id = "normal_params",
        numericInput("mean", "Mean:", value = 0),
        numericInput("stdDev", "Standard Deviation:", value = 1)
    ),
    div(id = "binomial_params",
        numericInput("n", "Number of Trials (n):", value = 10),
        numericInput("p", "Probability of Success (p):", value = 0.5)
    ),
    div(id = "poisson_params",
        numericInput("lambda", "Lambda:", value = 1)
    ),
    div(id = "exponential_params",
        numericInput("lambdaExp", "Rate (lambda):", value = 1)
    ),
    div(id = "gamma_params",
        numericInput("shape", "Shape:", value = 2),
        numericInput("scale", "Scale:", value = 2)
    ),
    div(id = "uniform_params",
        numericInput("min", "Min:", value = 0),
        numericInput("max", "Max:", value = 1)
    ),
    div(id = "beta_params",
        numericInput("alpha", "Alpha:", value = 2),
        numericInput("beta", "Beta:", value = 5)
    ),
    div(id = "chi_square_params",
        numericInput("dfChiSquare", "Degrees of Freedom:", value = 2)
    ),
    div(id = "lognormal_params",
        numericInput("logMean", "Mean (log):", value = 0),
        numericInput("logStdDev", "Standard Deviation (log):", value = 1)
    ),
    div(id = "weibull_params",
        numericInput("shapeWeibull", "Shape:", value = 2),
        numericInput("scaleWeibull", "Scale:", value = 1)
    ),
    div(id = "cauchy_params",
        numericInput("locationCauchy", "Location:", value = 0),
        numericInput("scaleCauchy", "Scale:", value = 1)
    ),
    div(id = "student_t_params",
        numericInput("dfStudentT", "Degrees of Freedom:", value = 10)
    ),
    div(id = "f_params",
        numericInput("df1", "Degrees of Freedom 1:", value = 1),
        numericInput("df2", "Degrees of Freedom 2:", value = 1)
    ),
    numericInput("simulations", "Number of Simulations:", value = 1000),
    numericInput("bins", "Number of Histogram Bins:", value = 30, min = 1, step = 1),
    downloadButton("downloadData", "Download Data")
  ),
  dashboardBody(
    fluidRow(
      box(plotOutput("theoreticalPlot", height = 250)),
      box(plotOutput("simulationPlot", height = 250))
    ),
    fluidRow(
      valueBoxOutput("meanBox"),
      valueBoxOutput("sdBox"),
      valueBoxOutput("medianBox"),
      valueBoxOutput("skewnessBox"),
      valueBoxOutput("kurtosisBox")
    )
  )
)

# Define server logic
server <- function(input, output, session) {
  observe({
    shinyjs::hide(selector = "div[id$='_params']")
    if (input$distribution == "Normal") {
      shinyjs::show("normal_params")
    } else if (input$distribution == "Binomial") {
      shinyjs::show("binomial_params")
    } else if (input$distribution == "Poisson") {
      shinyjs::show("poisson_params")
    } else if (input$distribution == "Exponential") {
      shinyjs::show("exponential_params")
    } else if (input$distribution == "Gamma") {
      shinyjs::show("gamma_params")
    } else if (input$distribution == "Uniform") {
      shinyjs::show("uniform_params")
    } else if (input$distribution == "Beta") {
      shinyjs::show("beta_params")
    } else if (input$distribution == "Chi-Square") {
      shinyjs::show("chi_square_params")
    } else if (input$distribution == "Lognormal") {
      shinyjs::show("lognormal_params")
    } else if (input$distribution == "Weibull") {
      shinyjs::show("weibull_params")
    } else if (input$distribution == "Cauchy") {
      shinyjs::show("cauchy_params")
    } else if (input$distribution == "Student's T") {
      shinyjs::show("student_t_params")
    } else if (input$distribution == "F Distribution") {
      shinyjs::show("f_params")
    }
  })
  
  generate_data <- reactive({
    dist <- input$distribution
    simulations <- input$simulations
    data <- NULL
    
    if (dist == "Normal") {
      data <- rnorm(simulations, mean = input$mean, sd = input$stdDev)
    } else if (dist == "Binomial") {
      data <- rbinom(simulations, size = input$n, prob = input$p)
    } else if (dist == "Poisson") {
      data <- rpois(simulations, lambda = input$lambda)
    } else if (dist == "Exponential") {
      data <- rexp(simulations, rate = input$lambdaExp)
    } else if (dist == "Gamma") {
      data <- rgamma(simulations, shape = input$shape, scale = input$scale)
    } else if (dist == "Uniform") {
      data <- runif(simulations, min = input$min, max = input$max)
    } else if (dist == "Beta") {
      data <- rbeta(simulations, shape1 = input$alpha, shape2 = input$beta)
    } else if (dist == "Chi-Square") {
      data <- rchisq(simulations, df = input$dfChiSquare)
    } else if (dist == "Lognormal") {
      data <- rlnorm(simulations, meanlog = input$logMean, sdlog = input$logStdDev)
    } else if (dist == "Weibull") {
      data <- rweibull(simulations, shape = input$shapeWeibull, scale = input$scaleWeibull)
    } else if (dist == "Cauchy") {
      data <- rcauchy(simulations, location = input$locationCauchy, scale = input$scaleCauchy)
    } else if (dist == "Student's T") {
      data <- rt(simulations, df = input$dfStudentT)
    } else if (dist == "F Distribution") {
      data <- rf(simulations, df1 = input$df1, df2 = input$df2)
    }
    
    return(data)
  })
  
  generate_theoretical <- reactive({
    dist <- input$distribution
    x <- seq(-10, 10, length.out = 1000)
    y <- NULL
    
    if (dist == "Normal") {
      x <- seq(input$mean - 4 * input$stdDev, input$mean + 4 * input$stdDev, length.out = 1000)
      y <- dnorm(x, mean = input$mean, sd = input$stdDev)
    } else if (dist == "Binomial") {
      x <- 0:input$n
      y <- dbinom(x, size = input$n, prob = input$p)
    } else if (dist == "Poisson") {
      x <- 0:(input$lambda * 3)
      y <- dpois(x, lambda = input$lambda)
    } else if (dist == "Exponential") {
      x <- seq(0, 10, length.out = 1000)
      y <- dexp(x, rate = input$lambdaExp)
    } else if (dist == "Gamma") {
      x <- seq(0, 10, length.out = 1000)
      y <- dgamma(x, shape = input$shape, scale = input$scale)
    } else if (dist == "Uniform") {
      x <- seq(input$min, input$max, length.out = 1000)
      y <- dunif(x, min = input$min, max = input$max)
    } else if (dist == "Beta") {
      x <- seq(0, 1, length.out = 1000)
      y <- dbeta(x, shape1 = input$alpha, shape2 = input$beta)
    } else if (dist == "Chi-Square") {
      x <- seq(0, 10, length.out = 1000)
      y <- dchisq(x, df = input$dfChiSquare)
    } else if (dist == "Lognormal") {
      x <- seq(0, 10, length.out = 1000)
      y <- dlnorm(x, meanlog = input$logMean, sdlog = input$logStdDev)
    } else if (dist == "Weibull") {
      x <- seq(0, 10, length.out = 1000)
      y <- dweibull(x, shape = input$shapeWeibull, scale = input$scaleWeibull)
    } else if (dist == "Cauchy") {
      x <- seq(input$locationCauchy - 10, input$locationCauchy + 10, length.out = 1000)
      y <- dcauchy(x, location = input$locationCauchy, scale = input$scaleCauchy)
    } else if (dist == "Student's T") {
      x <- seq(-10, 10, length.out = 1000)
      y <- dt(x, df = input$dfStudentT)
    } else if (dist == "F Distribution") {
      x <- seq(0, 10, length.out = 1000)
      y <- df(x, df1 = input$df1, df2 = input$df2)
    }
    
    return(data.frame(x, y))
  })
  
  output$theoreticalPlot <- renderPlot({
    data <- generate_theoretical()
    ggplot(data, aes(x = x, y = y)) +
      geom_line(color = "blue") +
      labs(title = "Theoretical Distribution", x = "Value", y = "Density") +
      theme_minimal()
  })
  
  output$simulationPlot <- renderPlot({
    data <- generate_data()
    ggplot(data = data.frame(x = data), aes(x = x)) +
      geom_histogram(aes(y = ..density..), bins = input$bins, fill = "lightblue", color = "black") +
      labs(title = "Simulation Results", x = "Value", y = "Density") +
      theme_minimal()
  })
  
  output$meanBox <- renderValueBox({
    data <- generate_data()
    valueBox(
      value = round(mean(data), 2),
      subtitle = "Sample Mean",
      color = "blue"
    )
  })
  
  output$sdBox <- renderValueBox({
    data <- generate_data()
    valueBox(
      value = round(sd(data), 2),
      subtitle = "Sample Standard Deviation",
      color = "blue"
    )
  })
  
  output$medianBox <- renderValueBox({
    data <- generate_data()
    valueBox(
      value = round(median(data), 2),
      subtitle = "Sample Median",
      color = "blue"
    )
  })
  
  output$skewnessBox <- renderValueBox({
    data <- generate_data()
    valueBox(
      value = round(skewness(data), 2),
      subtitle = "Sample Skewness",
      color = "blue"
    )
  })
  
  output$kurtosisBox <- renderValueBox({
    data <- generate_data()
    valueBox(
      value = round(kurtosis(data), 2),
      subtitle = "Sample Kurtosis",
      color = "blue"
    )
  })
  
  output$downloadData <- downloadHandler(
    filename = function() {
      paste("data-", Sys.Date(), ".csv", sep="")
    },
    content = function(file) {
      data <- generate_data()
      write.csv(data.frame(Value = data), file)
    }
  )
}

# Run the application 
shinyApp(ui, server)

