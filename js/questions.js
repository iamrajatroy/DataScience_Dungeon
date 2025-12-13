// ========================================
// DATA SCIENCE DUNGEON - QUESTION BANK
// ========================================

const QUESTIONS = [
    // ==================== STATISTICS ====================
    // Easy
    { id: 1, topic: "Statistics", difficulty: "easy", question: "What does the mean of a dataset represent?", options: { A: "The most frequent value", B: "The middle value when sorted", C: "The average of all values", D: "The range of values" }, answer: "C", explanation: "The mean is calculated by summing all values and dividing by the count, representing the average." },
    { id: 2, topic: "Statistics", difficulty: "easy", question: "What is the median of the dataset [1, 3, 5, 7, 9]?", options: { A: "3", B: "5", C: "7", D: "25" }, answer: "B", explanation: "The median is the middle value when data is sorted. In [1,3,5,7,9], the median is 5." },
    { id: 3, topic: "Statistics", difficulty: "easy", question: "What is standard deviation used to measure?", options: { A: "Central tendency", B: "Data spread/dispersion", C: "Data symmetry", D: "Sample size" }, answer: "B", explanation: "Standard deviation measures how spread out the values are from the mean." },
    { id: 4, topic: "Statistics", difficulty: "easy", question: "Which measure of central tendency is most affected by outliers?", options: { A: "Mean", B: "Median", C: "Mode", D: "Range" }, answer: "A", explanation: "The mean is sensitive to extreme values (outliers) because it uses all data points." },
    { id: 5, topic: "Statistics", difficulty: "easy", question: "What is a probability value that represents impossibility?", options: { A: "0", B: "0.5", C: "1", D: "-1" }, answer: "A", explanation: "A probability of 0 means the event is impossible, while 1 means certain." },
    { id: 6, topic: "Statistics", difficulty: "easy", question: "What type of variable can take only specific values?", options: { A: "Continuous", B: "Discrete", C: "Ordinal", D: "Nominal" }, answer: "B", explanation: "Discrete variables can only take specific, countable values (like integers)." },
    { id: 7, topic: "Statistics", difficulty: "easy", question: "What chart is best for showing the distribution of a single continuous variable?", options: { A: "Bar chart", B: "Pie chart", C: "Histogram", D: "Line chart" }, answer: "C", explanation: "Histograms show frequency distributions of continuous data by grouping into bins." },

    // Medium
    { id: 8, topic: "Statistics", difficulty: "medium", question: "What does a p-value of 0.03 indicate in hypothesis testing?", options: { A: "3% chance the null hypothesis is true", B: "3% probability of observing results if null is true", C: "97% confidence level", D: "The test failed" }, answer: "B", explanation: "P-value represents the probability of observing results at least as extreme as those obtained, assuming the null hypothesis is true." },
    { id: 9, topic: "Statistics", difficulty: "medium", question: "What is the Central Limit Theorem about?", options: { A: "Sample means are always normal", B: "Large sample means approach normal distribution", C: "Population must be normal", D: "Variance equals mean" }, answer: "B", explanation: "CLT states that the sampling distribution of means approaches normal distribution as sample size increases, regardless of population distribution." },
    { id: 10, topic: "Statistics", difficulty: "medium", question: "What is a Type I error?", options: { A: "Failing to reject a false null hypothesis", B: "Rejecting a true null hypothesis", C: "Accepting an alternative hypothesis", D: "Using wrong sample size" }, answer: "B", explanation: "Type I error (false positive) occurs when we reject a null hypothesis that is actually true." },
    { id: 11, topic: "Statistics", difficulty: "medium", question: "What does correlation coefficient r = -0.95 indicate?", options: { A: "Strong positive relationship", B: "Weak negative relationship", C: "Strong negative relationship", D: "No relationship" }, answer: "C", explanation: "A correlation close to -1 indicates a strong negative linear relationship between variables." },
    { id: 12, topic: "Statistics", difficulty: "medium", question: "What is the purpose of a confidence interval?", options: { A: "To find exact parameter values", B: "To estimate a range for population parameters", C: "To test hypotheses", D: "To calculate variance" }, answer: "B", explanation: "Confidence intervals provide a range of values likely to contain the true population parameter." },
    { id: 13, topic: "Statistics", difficulty: "medium", question: "What distribution is used for rare events?", options: { A: "Normal", B: "Binomial", C: "Poisson", D: "Uniform" }, answer: "C", explanation: "Poisson distribution models the probability of rare events occurring in a fixed interval." },
    { id: 14, topic: "Statistics", difficulty: "medium", question: "What is multicollinearity in regression?", options: { A: "Too many dependent variables", B: "High correlation between predictors", C: "Non-linear relationships", D: "Heteroscedasticity" }, answer: "B", explanation: "Multicollinearity occurs when independent variables are highly correlated with each other." },

    // Hard
    { id: 15, topic: "Statistics", difficulty: "hard", question: "What is the difference between MLE and MAP estimation?", options: { A: "MLE uses priors, MAP doesn't", B: "MAP uses priors, MLE doesn't", C: "They are identical", D: "MAP is for classification only" }, answer: "B", explanation: "Maximum A Posteriori (MAP) incorporates prior beliefs while Maximum Likelihood (MLE) only uses data likelihood." },
    { id: 16, topic: "Statistics", difficulty: "hard", question: "What does the Kolmogorov-Smirnov test evaluate?", options: { A: "Mean differences", B: "Variance equality", C: "Distribution fit", D: "Correlation strength" }, answer: "C", explanation: "K-S test compares a sample distribution to a reference distribution or compares two samples." },
    { id: 17, topic: "Statistics", difficulty: "hard", question: "What is heteroscedasticity?", options: { A: "Constant variance in residuals", B: "Non-constant variance in residuals", C: "Correlated errors", D: "Non-normal errors" }, answer: "B", explanation: "Heteroscedasticity refers to non-constant variance of residuals across levels of predictors." },
    { id: 18, topic: "Statistics", difficulty: "hard", question: "What is the Bonferroni correction used for?", options: { A: "Adjusting p-values for multiple comparisons", B: "Correcting sampling bias", C: "Normalizing data", D: "Imputing missing values" }, answer: "A", explanation: "Bonferroni correction adjusts significance levels when performing multiple statistical tests." },

    // ==================== MACHINE LEARNING ====================
    // Easy
    { id: 19, topic: "Machine Learning", difficulty: "easy", question: "What is supervised learning?", options: { A: "Learning without labels", B: "Learning with labeled data", C: "Learning by trial and error", D: "Learning from rules" }, answer: "B", explanation: "Supervised learning uses labeled training data where both inputs and correct outputs are provided." },
    { id: 20, topic: "Machine Learning", difficulty: "easy", question: "What is overfitting?", options: { A: "Model performs well on test data", B: "Model is too simple for the data", C: "Model memorizes training data, fails on new data", D: "Model has too few parameters" }, answer: "C", explanation: "Overfitting occurs when a model learns noise in training data and fails to generalize." },
    { id: 21, topic: "Machine Learning", difficulty: "easy", question: "Which algorithm is used for classification?", options: { A: "Linear Regression", B: "K-Means", C: "Decision Tree", D: "PCA" }, answer: "C", explanation: "Decision Trees can be used for classification by splitting data based on features." },
    { id: 22, topic: "Machine Learning", difficulty: "easy", question: "What does K-Means algorithm do?", options: { A: "Classifies data", B: "Clusters data into K groups", C: "Reduces dimensions", D: "Predicts values" }, answer: "B", explanation: "K-Means is an unsupervised algorithm that partitions data into K clusters." },
    { id: 23, topic: "Machine Learning", difficulty: "easy", question: "What is a feature in machine learning?", options: { A: "The target variable", B: "An input variable used for prediction", C: "The model output", D: "A hyperparameter" }, answer: "B", explanation: "Features are input variables (attributes) used by models to make predictions." },
    { id: 24, topic: "Machine Learning", difficulty: "easy", question: "What is the purpose of train-test split?", options: { A: "To speed up training", B: "To evaluate model on unseen data", C: "To reduce overfitting", D: "To increase accuracy" }, answer: "B", explanation: "Train-test split reserves data for evaluating how well the model generalizes to new data." },
    { id: 25, topic: "Machine Learning", difficulty: "easy", question: "What is a label in supervised learning?", options: { A: "Input data", B: "The correct answer/output", C: "Feature name", D: "Model parameter" }, answer: "B", explanation: "Labels are the target values that the model learns to predict." },

    // Medium
    { id: 26, topic: "Machine Learning", difficulty: "medium", question: "What is cross-validation used for?", options: { A: "Training models faster", B: "Robust performance estimation", C: "Feature selection", D: "Data augmentation" }, answer: "B", explanation: "Cross-validation provides a more robust estimate of model performance by training on multiple data splits." },
    { id: 27, topic: "Machine Learning", difficulty: "medium", question: "What does the bias-variance tradeoff describe?", options: { A: "Speed vs accuracy", B: "Model complexity vs generalization", C: "Training time vs epochs", D: "Features vs samples" }, answer: "B", explanation: "Bias-variance tradeoff describes balancing model complexity: too simple (high bias) vs too complex (high variance)." },
    { id: 28, topic: "Machine Learning", difficulty: "medium", question: "What is the purpose of regularization?", options: { A: "To speed up training", B: "To prevent overfitting", C: "To increase model complexity", D: "To handle missing data" }, answer: "B", explanation: "Regularization adds a penalty term to prevent overfitting by discouraging complex models." },
    { id: 29, topic: "Machine Learning", difficulty: "medium", question: "What is the difference between L1 and L2 regularization?", options: { A: "L1 uses squared weights, L2 uses absolute", B: "L1 uses absolute weights, L2 uses squared", C: "They are the same", D: "L1 is for classification only" }, answer: "B", explanation: "L1 (Lasso) uses absolute weights and can zero out features; L2 (Ridge) uses squared weights." },
    { id: 30, topic: "Machine Learning", difficulty: "medium", question: "What is precision in classification?", options: { A: "TP / (TP + FN)", B: "TP / (TP + FP)", C: "TN / (TN + FP)", D: "(TP + TN) / Total" }, answer: "B", explanation: "Precision = True Positives / (True Positives + False Positives), measuring prediction accuracy for positive class." },
    { id: 31, topic: "Machine Learning", difficulty: "medium", question: "What is the purpose of feature scaling?", options: { A: "To remove features", B: "To normalize feature ranges", C: "To add new features", D: "To handle missing values" }, answer: "B", explanation: "Feature scaling normalizes features to similar ranges, improving algorithm performance." },
    { id: 32, topic: "Machine Learning", difficulty: "medium", question: "What is ensemble learning?", options: { A: "Using a single strong model", B: "Combining multiple models", C: "Training on subsets", D: "Using neural networks" }, answer: "B", explanation: "Ensemble learning combines multiple models to improve prediction accuracy and robustness." },
    { id: 33, topic: "Machine Learning", difficulty: "medium", question: "What does the ROC curve plot?", options: { A: "Precision vs Recall", B: "True Positive Rate vs False Positive Rate", C: "Accuracy vs Loss", D: "Bias vs Variance" }, answer: "B", explanation: "ROC curve plots True Positive Rate (sensitivity) against False Positive Rate at various thresholds." },

    // Hard
    { id: 34, topic: "Machine Learning", difficulty: "hard", question: "What is the kernel trick in SVM?", options: { A: "Reducing dimensions", B: "Computing similarities in high-dim space efficiently", C: "Speeding up training", D: "Regularization technique" }, answer: "B", explanation: "The kernel trick allows SVMs to compute high-dimensional feature space similarities without explicit transformation." },
    { id: 35, topic: "Machine Learning", difficulty: "hard", question: "What is gradient boosting's main idea?", options: { A: "Training models in parallel", B: "Sequential training on residuals", C: "Random feature selection", D: "Bagging with replacement" }, answer: "B", explanation: "Gradient boosting trains models sequentially, with each model correcting errors of previous ones." },
    { id: 36, topic: "Machine Learning", difficulty: "hard", question: "What causes the curse of dimensionality?", options: { A: "Too few features", B: "Data becomes sparse in high dimensions", C: "Too many samples", D: "Linear relationships" }, answer: "B", explanation: "In high dimensions, data becomes sparse and distances become less meaningful, affecting algorithms." },
    { id: 37, topic: "Machine Learning", difficulty: "hard", question: "What is SMOTE used for?", options: { A: "Feature extraction", B: "Handling class imbalance", C: "Dimensionality reduction", D: "Model selection" }, answer: "B", explanation: "SMOTE (Synthetic Minority Over-sampling Technique) creates synthetic samples for minority classes." },

    // ==================== DEEP LEARNING ====================
    // Easy
    { id: 38, topic: "Deep Learning", difficulty: "easy", question: "What is a neural network?", options: { A: "A statistical test", B: "Layers of connected nodes inspired by the brain", C: "A database system", D: "A clustering algorithm" }, answer: "B", explanation: "Neural networks are computing systems with interconnected nodes organized in layers, inspired by biological neurons." },
    { id: 39, topic: "Deep Learning", difficulty: "easy", question: "What is an activation function?", options: { A: "Function to start training", B: "Function that introduces non-linearity", C: "Function to load data", D: "Function to save models" }, answer: "B", explanation: "Activation functions add non-linearity, allowing networks to learn complex patterns." },
    { id: 40, topic: "Deep Learning", difficulty: "easy", question: "What is backpropagation?", options: { A: "Forward pass through network", B: "Algorithm to compute gradients", C: "Data preprocessing step", D: "Model evaluation" }, answer: "B", explanation: "Backpropagation calculates gradients of the loss with respect to weights for optimization." },
    { id: 41, topic: "Deep Learning", difficulty: "easy", question: "What does CNN stand for?", options: { A: "Central Neural Network", B: "Convolutional Neural Network", C: "Connected Node Network", D: "Computed Numeric Network" }, answer: "B", explanation: "CNN stands for Convolutional Neural Network, commonly used for image processing." },
    { id: 42, topic: "Deep Learning", difficulty: "easy", question: "What is an epoch in training?", options: { A: "One pass through entire training data", B: "One batch update", C: "Model evaluation step", D: "Initial weight setting" }, answer: "A", explanation: "An epoch is one complete pass through the entire training dataset." },
    { id: 43, topic: "Deep Learning", difficulty: "easy", question: "What is the purpose of dropout?", options: { A: "Speed up training", B: "Prevent overfitting", C: "Add more layers", D: "Increase accuracy" }, answer: "B", explanation: "Dropout randomly deactivates neurons during training to prevent overfitting." },

    // Medium
    { id: 44, topic: "Deep Learning", difficulty: "medium", question: "What is vanishing gradient problem?", options: { A: "Gradients become too large", B: "Gradients become too small to update weights", C: "Gradient computation is slow", D: "Gradients oscillate" }, answer: "B", explanation: "Vanishing gradients occur when gradients become extremely small, preventing effective learning in deep networks." },
    { id: 45, topic: "Deep Learning", difficulty: "medium", question: "What is the purpose of batch normalization?", options: { A: "To increase batch size", B: "To normalize layer inputs for faster training", C: "To reduce parameters", D: "To add noise" }, answer: "B", explanation: "Batch normalization normalizes layer inputs, reducing internal covariate shift and accelerating training." },
    { id: 46, topic: "Deep Learning", difficulty: "medium", question: "What is transfer learning?", options: { A: "Moving data between systems", B: "Using pre-trained models for new tasks", C: "Copying model weights", D: "Data augmentation" }, answer: "B", explanation: "Transfer learning uses knowledge from pre-trained models to solve new, related problems." },
    { id: 47, topic: "Deep Learning", difficulty: "medium", question: "What is an LSTM used for?", options: { A: "Image classification", B: "Sequential/time-series data", C: "Dimensionality reduction", D: "Clustering" }, answer: "B", explanation: "LSTM (Long Short-Term Memory) networks handle sequential data by maintaining long-term dependencies." },
    { id: 48, topic: "Deep Learning", difficulty: "medium", question: "What optimizer is commonly used in deep learning?", options: { A: "K-Means", B: "Adam", C: "PCA", D: "DBSCAN" }, answer: "B", explanation: "Adam (Adaptive Moment Estimation) is a popular optimizer combining momentum and adaptive learning rates." },
    { id: 49, topic: "Deep Learning", difficulty: "medium", question: "What is the purpose of padding in CNNs?", options: { A: "To increase speed", B: "To preserve spatial dimensions", C: "To reduce parameters", D: "To add noise" }, answer: "B", explanation: "Padding adds borders to input to control output size and preserve edge information." },
    { id: 50, topic: "Deep Learning", difficulty: "medium", question: "What is early stopping?", options: { A: "Stopping training when validation loss stops improving", B: "Reducing learning rate", C: "Removing layers", D: "Batch normalization" }, answer: "A", explanation: "Early stopping prevents overfitting by stopping training when validation performance degrades." },

    // Hard
    { id: 51, topic: "Deep Learning", difficulty: "hard", question: "What is the attention mechanism?", options: { A: "Focusing on relevant parts of input", B: "Increasing model depth", C: "Reducing computation", D: "Data preprocessing" }, answer: "A", explanation: "Attention allows models to focus on relevant parts of input when making predictions." },
    { id: 52, topic: "Deep Learning", difficulty: "hard", question: "What is residual learning (ResNet)?", options: { A: "Learning absolute values", B: "Learning residual mappings with skip connections", C: "Reducing network depth", D: "Dropout variant" }, answer: "B", explanation: "ResNet uses skip connections to learn residual functions, enabling very deep networks." },
    { id: 53, topic: "Deep Learning", difficulty: "hard", question: "What is weight initialization's purpose?", options: { A: "To speed up inference", B: "To prevent vanishing/exploding gradients", C: "To reduce memory", D: "To simplify architecture" }, answer: "B", explanation: "Proper weight initialization helps maintain gradient flow and stable training." },
    { id: 54, topic: "Deep Learning", difficulty: "hard", question: "What is the receptive field in CNNs?", options: { A: "Number of filters", B: "Input region each neuron 'sees'", C: "Output image size", D: "Pooling window" }, answer: "B", explanation: "Receptive field is the region of input that influences a particular output unit's activation." },

    // ==================== REINFORCEMENT LEARNING ====================
    // Easy
    { id: 55, topic: "Reinforcement Learning", difficulty: "easy", question: "What is reinforcement learning?", options: { A: "Learning from labeled data", B: "Learning from rewards/penalties", C: "Learning from clusters", D: "Learning from rules" }, answer: "B", explanation: "RL involves an agent learning to make decisions by receiving rewards or penalties." },
    { id: 56, topic: "Reinforcement Learning", difficulty: "easy", question: "What is an agent in RL?", options: { A: "The environment", B: "The learner that takes actions", C: "The reward signal", D: "The dataset" }, answer: "B", explanation: "The agent is the learner that observes states, takes actions, and receives rewards." },
    { id: 57, topic: "Reinforcement Learning", difficulty: "easy", question: "What is a reward in RL?", options: { A: "Model parameters", B: "Feedback signal for actions", C: "Training data", D: "Network architecture" }, answer: "B", explanation: "Rewards are scalar feedback signals that indicate how good an action was." },
    { id: 58, topic: "Reinforcement Learning", difficulty: "easy", question: "What is the environment in RL?", options: { A: "The agent's memory", B: "What the agent interacts with", C: "The training data", D: "The neural network" }, answer: "B", explanation: "The environment is the world the agent interacts with and receives observations from." },

    // Medium
    { id: 59, topic: "Reinforcement Learning", difficulty: "medium", question: "What is the exploration-exploitation tradeoff?", options: { A: "Speed vs accuracy", B: "Trying new actions vs using known good actions", C: "Training vs testing", D: "Online vs offline" }, answer: "B", explanation: "Balancing between exploring new actions to find better rewards vs exploiting known good actions." },
    { id: 60, topic: "Reinforcement Learning", difficulty: "medium", question: "What is Q-learning?", options: { A: "Supervised learning method", B: "Model-free RL algorithm learning action values", C: "Clustering algorithm", D: "Dimensionality reduction" }, answer: "B", explanation: "Q-learning is a model-free RL algorithm that learns the value of actions in states." },
    { id: 61, topic: "Reinforcement Learning", difficulty: "medium", question: "What is the discount factor (gamma) in RL?", options: { A: "Learning rate", B: "Factor for valuing future rewards", C: "Regularization term", D: "Batch size" }, answer: "B", explanation: "Discount factor determines how much future rewards are valued compared to immediate rewards." },
    { id: 62, topic: "Reinforcement Learning", difficulty: "medium", question: "What is a policy in RL?", options: { A: "Network architecture", B: "Mapping from states to actions", C: "Reward function", D: "Training algorithm" }, answer: "B", explanation: "A policy defines the agent's behavior by mapping states to actions (or action probabilities)." },
    { id: 63, topic: "Reinforcement Learning", difficulty: "medium", question: "What is the Markov property?", options: { A: "Future depends on entire history", B: "Future depends only on current state", C: "Actions are random", D: "Rewards are constant" }, answer: "B", explanation: "Markov property states that the future is independent of the past given the present state." },

    // Hard
    { id: 64, topic: "Reinforcement Learning", difficulty: "hard", question: "What is the Bellman equation used for?", options: { A: "Defining optimal value functions recursively", B: "Computing gradients", C: "Feature extraction", D: "Sampling actions" }, answer: "A", explanation: "Bellman equations define value functions recursively, foundational to many RL algorithms." },
    { id: 65, topic: "Reinforcement Learning", difficulty: "hard", question: "What is actor-critic architecture?", options: { A: "Single network for value estimation", B: "Separate networks for policy and value", C: "Ensemble of policies", D: "Model-based approach" }, answer: "B", explanation: "Actor-critic uses separate networks: actor for policy, critic for value estimation." },
    { id: 66, topic: "Reinforcement Learning", difficulty: "hard", question: "What is PPO's main innovation?", options: { A: "Using value functions only", B: "Clipped surrogate objective for stable updates", C: "Off-policy learning", D: "Model-based planning" }, answer: "B", explanation: "PPO (Proximal Policy Optimization) uses clipped objectives to prevent large policy updates." },
    { id: 67, topic: "Reinforcement Learning", difficulty: "hard", question: "What is experience replay?", options: { A: "Replaying the game", B: "Storing and sampling past transitions", C: "Resetting environment", D: "Copying policies" }, answer: "B", explanation: "Experience replay stores past experiences in a buffer and samples them for training." },

    // ==================== NLP ====================
    // Easy
    { id: 68, topic: "NLP", difficulty: "easy", question: "What does NLP stand for?", options: { A: "Neural Learning Process", B: "Natural Language Processing", C: "Network Layer Protocol", D: "Numeric Linear Programming" }, answer: "B", explanation: "NLP stands for Natural Language Processing, dealing with text and language understanding." },
    { id: 69, topic: "NLP", difficulty: "easy", question: "What is tokenization?", options: { A: "Encrypting text", B: "Splitting text into smaller units", C: "Translating text", D: "Summarizing text" }, answer: "B", explanation: "Tokenization splits text into tokens (words, subwords, or characters) for processing." },
    { id: 70, topic: "NLP", difficulty: "easy", question: "What is a stop word?", options: { A: "Error in text", B: "Common words often filtered out", C: "Punctuation", D: "Rare words" }, answer: "B", explanation: "Stop words are common words (the, is, a) often removed as they carry little meaning." },
    { id: 71, topic: "NLP", difficulty: "easy", question: "What is stemming?", options: { A: "Adding prefixes", B: "Reducing words to their root form", C: "Translating words", D: "Finding synonyms" }, answer: "B", explanation: "Stemming reduces words to their root/base form (running → run)." },
    { id: 72, topic: "NLP", difficulty: "easy", question: "What is sentiment analysis?", options: { A: "Grammar checking", B: "Determining emotional tone of text", C: "Language translation", D: "Text summarization" }, answer: "B", explanation: "Sentiment analysis determines whether text expresses positive, negative, or neutral sentiment." },

    // Medium
    { id: 73, topic: "NLP", difficulty: "medium", question: "What is TF-IDF?", options: { A: "Neural network architecture", B: "Term frequency-inverse document frequency weighting", C: "Translation function", D: "Text formatting" }, answer: "B", explanation: "TF-IDF weights words by their frequency in a document relative to their corpus frequency." },
    { id: 74, topic: "NLP", difficulty: "medium", question: "What are word embeddings?", options: { A: "Word counts", B: "Dense vector representations of words", C: "Grammar rules", D: "Stop word lists" }, answer: "B", explanation: "Word embeddings represent words as dense vectors where similar words are close in vector space." },
    { id: 75, topic: "NLP", difficulty: "medium", question: "What is Word2Vec?", options: { A: "Translation model", B: "Algorithm to learn word embeddings", C: "Text classifier", D: "Tokenizer" }, answer: "B", explanation: "Word2Vec is an algorithm that learns word embeddings from large text corpora." },
    { id: 76, topic: "NLP", difficulty: "medium", question: "What is named entity recognition (NER)?", options: { A: "Finding verbs", B: "Identifying entities like names, places, dates", C: "Grammar checking", D: "Sentiment analysis" }, answer: "B", explanation: "NER identifies and classifies named entities (persons, organizations, locations) in text." },
    { id: 77, topic: "NLP", difficulty: "medium", question: "What is the bag-of-words model?", options: { A: "Neural network", B: "Text representation ignoring word order", C: "Grammar parser", D: "Translation model" }, answer: "B", explanation: "Bag-of-words represents text as word frequency counts, ignoring grammar and word order." },
    { id: 78, topic: "NLP", difficulty: "medium", question: "What is lemmatization?", options: { A: "Random word selection", B: "Reducing words to dictionary form", C: "Text encryption", D: "Adding punctuation" }, answer: "B", explanation: "Lemmatization reduces words to their dictionary form (better → good) using vocabulary and morphology." },

    // Hard
    { id: 79, topic: "NLP", difficulty: "hard", question: "What is the attention mechanism in NLP?", options: { A: "Filtering stop words", B: "Weighting input parts by relevance", C: "Tokenization method", D: "Parsing technique" }, answer: "B", explanation: "Attention allows models to focus on relevant parts of input when generating each output element." },
    { id: 80, topic: "NLP", difficulty: "hard", question: "What is BERT's main training objective?", options: { A: "Next sentence prediction only", B: "Masked language modeling and next sentence", C: "Translation", D: "Summarization" }, answer: "B", explanation: "BERT is trained on masked language modeling (predicting masked words) and next sentence prediction." },
    { id: 81, topic: "NLP", difficulty: "hard", question: "What is the difference between GRU and LSTM?", options: { A: "GRU has more gates", B: "GRU has fewer gates, simpler architecture", C: "They are identical", D: "GRU is not for sequences" }, answer: "B", explanation: "GRU has 2 gates (reset, update) vs LSTM's 3 (input, forget, output), making it simpler." },
    { id: 82, topic: "NLP", difficulty: "hard", question: "What is perplexity in language models?", options: { A: "Training speed", B: "Measure of how well model predicts text", C: "Number of parameters", D: "Vocabulary size" }, answer: "B", explanation: "Perplexity measures how surprised a model is by test data; lower is better for language models." },

    // ==================== LLMs ====================
    // Easy
    { id: 83, topic: "LLMs", difficulty: "easy", question: "What does LLM stand for?", options: { A: "Linear Learning Model", B: "Large Language Model", C: "Layered Logic Module", D: "Linguistic Learning Machine" }, answer: "B", explanation: "LLM stands for Large Language Model, trained on massive text data to understand and generate language." },
    { id: 84, topic: "LLMs", difficulty: "easy", question: "What is a prompt in LLMs?", options: { A: "Model weights", B: "Input text given to the model", C: "Training data", D: "Output format" }, answer: "B", explanation: "A prompt is the input text given to an LLM to generate a response or completion." },
    { id: 85, topic: "LLMs", difficulty: "easy", question: "What is GPT?", options: { A: "General Purpose Tokenizer", B: "Generative Pre-trained Transformer", C: "Gradient Processing Tool", D: "Graph Pattern Tracker" }, answer: "B", explanation: "GPT stands for Generative Pre-trained Transformer, a type of large language model." },
    { id: 86, topic: "LLMs", difficulty: "easy", question: "What is fine-tuning an LLM?", options: { A: "Building from scratch", B: "Adapting a pre-trained model to specific tasks", C: "Reducing model size", D: "Creating embeddings" }, answer: "B", explanation: "Fine-tuning adapts a pre-trained model to specific tasks using task-specific training data." },
    { id: 87, topic: "LLMs", difficulty: "easy", question: "What is the context window in LLMs?", options: { A: "Training duration", B: "Maximum input text length", C: "Number of layers", D: "Vocabulary size" }, answer: "B", explanation: "Context window is the maximum number of tokens an LLM can process in a single input." },

    // Medium
    { id: 88, topic: "LLMs", difficulty: "medium", question: "What is the transformer architecture based on?", options: { A: "Recurrence", B: "Self-attention mechanism", C: "Convolution", D: "Decision trees" }, answer: "B", explanation: "Transformers rely on self-attention to process sequences in parallel, replacing recurrence." },
    { id: 89, topic: "LLMs", difficulty: "medium", question: "What is zero-shot learning in LLMs?", options: { A: "Training from scratch", B: "Performing tasks without examples", C: "Using one example", D: "Maximum training" }, answer: "B", explanation: "Zero-shot learning enables models to perform tasks without any task-specific training examples." },
    { id: 90, topic: "LLMs", difficulty: "medium", question: "What is few-shot learning?", options: { A: "Minimal training data overall", B: "Learning from a few examples in the prompt", C: "Fast training", D: "Reduced parameters" }, answer: "B", explanation: "Few-shot learning uses a small number of examples in the prompt to guide model behavior." },
    { id: 91, topic: "LLMs", difficulty: "medium", question: "What is temperature in LLM generation?", options: { A: "Hardware temperature", B: "Parameter controlling output randomness", C: "Training speed", D: "Context length" }, answer: "B", explanation: "Temperature controls randomness in token selection; higher values = more diverse outputs." },
    { id: 92, topic: "LLMs", difficulty: "medium", question: "What is tokenization in LLMs typically based on?", options: { A: "Words only", B: "Subword units (BPE, SentencePiece)", C: "Characters only", D: "Sentences" }, answer: "B", explanation: "Modern LLMs use subword tokenization (BPE, SentencePiece) balancing vocabulary size and coverage." },
    { id: 93, topic: "LLMs", difficulty: "medium", question: "What is RLHF?", options: { A: "Random Learning High Frequency", B: "Reinforcement Learning from Human Feedback", C: "Recurrent Learning for Hierarchies", D: "Regularized Linear Hidden Features" }, answer: "B", explanation: "RLHF uses human preferences to fine-tune models, making outputs more helpful and aligned." },

    // Hard
    { id: 94, topic: "LLMs", difficulty: "hard", question: "What is the purpose of positional encoding?", options: { A: "Reducing model size", B: "Providing sequence position information", C: "Attention masking", D: "Token embedding" }, answer: "B", explanation: "Positional encodings provide position information since transformers don't have inherent order awareness." },
    { id: 95, topic: "LLMs", difficulty: "hard", question: "What is multi-head attention?", options: { A: "Single attention with multiple outputs", B: "Multiple parallel attention operations", C: "Attention on multiple sequences", D: "Hierarchical attention" }, answer: "B", explanation: "Multi-head attention runs multiple attention operations in parallel, capturing different relationships." },
    { id: 96, topic: "LLMs", difficulty: "hard", question: "What is LoRA in LLM fine-tuning?", options: { A: "Layer Optimization for Retrieval", B: "Low-Rank Adaptation of weights", C: "Learning Object Recognition", D: "Length of Response Adjustment" }, answer: "B", explanation: "LoRA adds small low-rank matrices for efficient fine-tuning without modifying original weights." },
    { id: 97, topic: "LLMs", difficulty: "hard", question: "What causes hallucination in LLMs?", options: { A: "Too much training data", B: "Model generating plausible but false information", C: "Insufficient parameters", D: "High temperature only" }, answer: "B", explanation: "Hallucinations occur when models generate confident but factually incorrect or fabricated content." },
    { id: 98, topic: "LLMs", difficulty: "hard", question: "What is chain-of-thought prompting?", options: { A: "Linking multiple models", B: "Prompting model to show reasoning steps", C: "Sequential training", D: "Memory chaining" }, answer: "B", explanation: "Chain-of-thought prompting encourages models to show step-by-step reasoning for better answers." },

    // ==================== GENERATIVE AI ====================
    // Easy
    { id: 99, topic: "Generative AI", difficulty: "easy", question: "What is generative AI?", options: { A: "AI that only classifies", B: "AI that creates new content", C: "AI that predicts numbers", D: "AI that clusters data" }, answer: "B", explanation: "Generative AI creates new content (text, images, audio) rather than just analyzing existing data." },
    { id: 100, topic: "Generative AI", difficulty: "easy", question: "What is an example of generative AI output?", options: { A: "Spam classification", B: "AI-generated images", C: "Stock price prediction", D: "Customer segmentation" }, answer: "B", explanation: "AI-generated images (like DALL-E outputs) are examples of generative AI creating new content." },
    { id: 101, topic: "Generative AI", difficulty: "easy", question: "What is DALL-E?", options: { A: "Text classifier", B: "Image generation model", C: "Speech recognition", D: "Translation service" }, answer: "B", explanation: "DALL-E is an AI model that generates images from text descriptions." },
    { id: 102, topic: "Generative AI", difficulty: "easy", question: "What is text-to-image generation?", options: { A: "Reading text from images", B: "Creating images from text descriptions", C: "Converting speech to text", D: "Translating languages" }, answer: "B", explanation: "Text-to-image generation creates images based on textual descriptions." },

    // Medium
    { id: 103, topic: "Generative AI", difficulty: "medium", question: "What are GANs?", options: { A: "Graph Analysis Networks", B: "Generative Adversarial Networks", C: "Gradient Averaging Networks", D: "General Attention Networks" }, answer: "B", explanation: "GANs consist of generator and discriminator networks competing to create realistic outputs." },
    { id: 104, topic: "Generative AI", difficulty: "medium", question: "What is the generator's role in GANs?", options: { A: "Classify real/fake", B: "Create fake samples", C: "Train discriminator", D: "Preprocess data" }, answer: "B", explanation: "The generator creates fake samples trying to fool the discriminator into thinking they're real." },
    { id: 105, topic: "Generative AI", difficulty: "medium", question: "What is a diffusion model?", options: { A: "Model that spreads data", B: "Model that learns to denoise data", C: "Classification model", D: "Clustering model" }, answer: "B", explanation: "Diffusion models learn to generate by reversing a gradual noising process." },
    { id: 106, topic: "Generative AI", difficulty: "medium", question: "What is Stable Diffusion?", options: { A: "Physics simulation", B: "Text-to-image diffusion model", C: "Chemical process model", D: "Network stability tool" }, answer: "B", explanation: "Stable Diffusion is a latent diffusion model for generating images from text prompts." },
    { id: 107, topic: "Generative AI", difficulty: "medium", question: "What is a VAE (Variational Autoencoder)?", options: { A: "Classification model", B: "Generative model with latent space", C: "Clustering algorithm", D: "Regression model" }, answer: "B", explanation: "VAEs encode data to latent space and decode to generate new samples." },
    { id: 108, topic: "Generative AI", difficulty: "medium", question: "What is prompt engineering?", options: { A: "Building hardware", B: "Crafting effective inputs for AI models", C: "Training from scratch", D: "Database design" }, answer: "B", explanation: "Prompt engineering involves crafting input text to get desired outputs from generative models." },

    // Hard
    { id: 109, topic: "Generative AI", difficulty: "hard", question: "What is mode collapse in GANs?", options: { A: "Generator fails to train", B: "Generator produces limited variety", C: "Discriminator wins", D: "Memory overflow" }, answer: "B", explanation: "Mode collapse occurs when the generator produces limited variations, not covering the full data distribution." },
    { id: 110, topic: "Generative AI", difficulty: "hard", question: "What is the latent space in generative models?", options: { A: "Output layer", B: "Compressed representation space", C: "Training data", D: "Loss function" }, answer: "B", explanation: "Latent space is a compressed representation where similar items are close together." },
    { id: 111, topic: "Generative AI", difficulty: "hard", question: "What is classifier-free guidance in diffusion?", options: { A: "Removing classifiers", B: "Guiding generation without external classifier", C: "Classification method", D: "Training technique" }, answer: "B", explanation: "Classifier-free guidance steers generation toward prompts without needing a separate classifier." },
    { id: 112, topic: "Generative AI", difficulty: "hard", question: "What is the CLIP model used for in image generation?", options: { A: "Image classification only", B: "Connecting text and image representations", C: "Audio processing", D: "Video editing" }, answer: "B", explanation: "CLIP learns to connect text and images in shared embedding space, guiding image generation." },

    // ==================== ADDITIONAL QUESTIONS (VERY HARD / EXPERT) ====================
    // Very Hard
    { id: 113, topic: "Statistics", difficulty: "very_hard", question: "What is the difference between parametric and non-parametric tests?", options: { A: "Both assume normal distribution", B: "Parametric assumes specific distributions, non-parametric doesn't", C: "Non-parametric is always better", D: "Parametric has no assumptions" }, answer: "B", explanation: "Parametric tests assume data follows certain distributions; non-parametric tests make fewer assumptions." },
    { id: 114, topic: "Machine Learning", difficulty: "very_hard", question: "What is the PAC learning framework?", options: { A: "Parallel Algorithm Computing", B: "Probably Approximately Correct learning", C: "Pattern Analysis Classification", D: "Predictive Accuracy Calculation" }, answer: "B", explanation: "PAC learning formalizes the goal of learning a good enough hypothesis with high probability." },
    { id: 115, topic: "Deep Learning", difficulty: "very_hard", question: "What is the dying ReLU problem?", options: { A: "ReLU activation is too slow", B: "Neurons stuck outputting zero permanently", C: "Gradient explosion", D: "Memory issues" }, answer: "B", explanation: "Dying ReLU occurs when neurons always output 0 for negative inputs, never updating." },
    { id: 116, topic: "Machine Learning", difficulty: "very_hard", question: "What is the VC dimension?", options: { A: "Validation curve", B: "Measure of model capacity/complexity", C: "Variance component", D: "Vector count" }, answer: "B", explanation: "VC dimension measures the capacity of a model class, indicating what patterns it can learn." },
    { id: 117, topic: "Deep Learning", difficulty: "very_hard", question: "What is neural architecture search (NAS)?", options: { A: "Manual network design", B: "Automated architecture optimization", C: "Weight initialization", D: "Hyperparameter tuning only" }, answer: "B", explanation: "NAS automates the search for optimal neural network architectures using algorithms." },
    { id: 118, topic: "NLP", difficulty: "very_hard", question: "What is the difference between encoder and decoder in transformers?", options: { A: "Encoder generates, decoder understands", B: "Encoder processes input, decoder generates output", C: "They are identical", D: "Decoder is for images only" }, answer: "B", explanation: "Encoder processes input into representations; decoder generates output sequence from those representations." },
    { id: 119, topic: "LLMs", difficulty: "very_hard", question: "What is FlashAttention?", options: { A: "Faster inference only", B: "Memory-efficient attention computation", C: "Smaller model size", D: "Faster tokenization" }, answer: "B", explanation: "FlashAttention reduces memory usage and speeds up attention by avoiding materializing the full attention matrix." },
    { id: 120, topic: "Generative AI", difficulty: "very_hard", question: "What is score matching in diffusion models?", options: { A: "Evaluating output quality", B: "Learning the gradient of data distribution", C: "Comparing images", D: "Classification metric" }, answer: "B", explanation: "Score matching trains the model to estimate the score (gradient of log-density) of the data." },

    // Expert
    { id: 121, topic: "Statistics", difficulty: "expert", question: "What is the method of moments estimation?", options: { A: "Using sample moments to estimate parameters", B: "Maximizing likelihood", C: "Minimizing variance", D: "Bayesian inference" }, answer: "A", explanation: "Method of moments sets sample moments equal to theoretical moments to solve for parameters." },
    { id: 122, topic: "Machine Learning", difficulty: "expert", question: "What is the Rademacher complexity?", options: { A: "Training time measure", B: "Measure of richness of function class", C: "Accuracy metric", D: "Memory usage" }, answer: "B", explanation: "Rademacher complexity measures how well a function class can fit random noise, indicating capacity." },
    { id: 123, topic: "Deep Learning", difficulty: "expert", question: "What is the lottery ticket hypothesis?", options: { A: "Random initialization works best", B: "Sparse subnetworks can match dense network performance", C: "More parameters always better", D: "Training is random" }, answer: "B", explanation: "Lottery ticket hypothesis: dense networks contain sparse subnetworks that can train to similar performance." },
    { id: 124, topic: "Reinforcement Learning", difficulty: "expert", question: "What is the difference between on-policy and off-policy learning?", options: { A: "On-policy is faster", B: "On-policy learns from current policy, off-policy from any", C: "Off-policy needs more data", D: "They are the same" }, answer: "B", explanation: "On-policy learns from actions taken by current policy; off-policy can learn from any collected data." },
    { id: 125, topic: "LLMs", difficulty: "expert", question: "What is KV-cache in transformer inference?", options: { A: "Training optimization", B: "Caching key-value pairs for faster generation", C: "Model compression", D: "Data preprocessing" }, answer: "B", explanation: "KV-cache stores key and value matrices from previous tokens to avoid recomputation during generation." },
    { id: 126, topic: "Generative AI", difficulty: "expert", question: "What is the ELBO in VAEs?", options: { A: "Encoder Layer Batch Optimization", B: "Evidence Lower Bound objective", C: "Error Loss Base Output", D: "Embedding Learning Base Objective" }, answer: "B", explanation: "ELBO (Evidence Lower Bound) is the VAE training objective, combining reconstruction and KL terms." },
    { id: 127, topic: "Deep Learning", difficulty: "expert", question: "What is gradient checkpointing?", options: { A: "Saving gradients to disk", B: "Recomputing activations to save memory", C: "Gradient verification", D: "Checkpoint averaging" }, answer: "B", explanation: "Gradient checkpointing trades computation for memory by recomputing activations during backprop." },
    { id: 128, topic: "Machine Learning", difficulty: "expert", question: "What is the Johnson-Lindenstrauss lemma about?", options: { A: "Clustering bounds", B: "Random projections preserve distances", C: "Classification accuracy", D: "Regression convergence" }, answer: "B", explanation: "JL lemma states random projections can reduce dimensionality while approximately preserving distances." },
    { id: 129, topic: "NLP", difficulty: "expert", question: "What is the difference between autoregressive and autoencoding LMs?", options: { A: "Autoregressive is bidirectional", B: "Autoregressive generates left-to-right, autoencoding sees full context", C: "They are identical", D: "Autoencoding generates text" }, answer: "B", explanation: "Autoregressive (GPT) generates token by token; autoencoding (BERT) processes full input bidirectionally." },
    { id: 130, topic: "Reinforcement Learning", difficulty: "expert", question: "What is the difference between value and policy iteration?", options: { A: "Value iteration is slower", B: "Value updates values, policy updates policy directly", C: "Policy iteration uses neural networks", D: "They solve different problems" }, answer: "B", explanation: "Value iteration repeatedly updates value function; policy iteration alternates policy evaluation and improvement." }
];

// Question Manager - Supports both API and local fallback
class QuestionManager {
    constructor() {
        this.answeredQuestionIds = new Set();
        this.questions = [...QUESTIONS];
        this.isOnline = false;
    }

    async initialize() {
        // Check if API is available
        this.isOnline = await window.api.healthCheck();

        // If online and authenticated, load answered questions from server
        if (this.isOnline && window.api.isAuthenticated()) {
            try {
                const answered = await window.api.getAnsweredQuestions();
                answered.forEach(a => this.answeredQuestionIds.add(a.question_id));
                console.log(`Loaded ${answered.length} answered questions from server`);
            } catch (e) {
                console.error('Failed to load answered questions:', e);
            }
        }
    }

    reset() {
        this.answeredQuestionIds = new Set();
    }

    /**
     * Get a random question based on room and chest number
     * Tries API first, then falls back to local questions
     * @param {number} roomNumber - Current room (1-10)
     * @param {number} chestNumber - Chest number (1-3)
     * @returns {object|null} - Question object or null if none available
     */
    async getQuestion(roomNumber, chestNumber) {
        // Try to get from API first
        if (this.isOnline && window.api.isAuthenticated()) {
            try {
                const question = await window.api.getQuestionByRoomChest(roomNumber, chestNumber);
                // Transform API response to match local format
                return {
                    id: question.id,
                    topic: question.topic,
                    difficulty: question.difficulty,
                    question: question.question_text,
                    options: {
                        A: question.option_a,
                        B: question.option_b,
                        C: question.option_c,
                        D: question.option_d
                    },
                    answer: question.correct_answer,
                    explanation: question.explanation
                };
            } catch (e) {
                console.warn('Failed to get question from API, using local fallback:', e);
            }
        }

        // Fallback to local questions
        return this.getLocalQuestion(roomNumber, chestNumber);
    }

    /**
     * Get a question from local storage (offline fallback)
     */
    getLocalQuestion(roomNumber, chestNumber) {
        const difficulty = this.getDifficulty(roomNumber, chestNumber);
        const availableQuestions = this.questions.filter(q =>
            q.difficulty === difficulty &&
            !this.answeredQuestionIds.has(q.id)
        );

        if (availableQuestions.length === 0) {
            // Fallback: try any difficulty
            const anyQuestions = this.questions.filter(q =>
                !this.answeredQuestionIds.has(q.id)
            );
            if (anyQuestions.length === 0) {
                return null;
            }
            return anyQuestions[Math.floor(Math.random() * anyQuestions.length)];
        }

        return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    }

    /**
     * Determine difficulty based on room and chest
     * Rooms 1-3: Easy, Medium, Hard
     * Rooms 4-6: Medium, Hard, Very Hard
     * Rooms 7-10: Hard, Very Hard, Expert
     */
    getDifficulty(roomNumber, chestNumber) {
        if (roomNumber <= 3) {
            if (chestNumber === 1) return "easy";
            if (chestNumber === 2) return "medium";
            return "hard";
        } else if (roomNumber <= 6) {
            if (chestNumber === 1) return "medium";
            if (chestNumber === 2) return "hard";
            return "very_hard";
        } else {
            if (chestNumber === 1) return "hard";
            if (chestNumber === 2) return "very_hard";
            return "expert";
        }
    }

    markAnswered(questionId) {
        this.answeredQuestionIds.add(questionId);
    }

    getAnsweredCount() {
        return this.answeredQuestionIds.size;
    }
}

// Export for use in other modules
window.QuestionManager = QuestionManager;
