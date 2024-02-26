// calculator.cpp

#include <QApplication>
#include <QWidget>
#include <QGridLayout>
#include <QPushButton>
#include <QLineEdit>

class Calculator : public QWidget {
    Q_OBJECT

public:
    Calculator(QWidget *parent = 0);

private slots:
    void buttonClicked();

private:
    QLineEdit *display;
    QGridLayout *layout;

    enum { NumDigitButtons = 10 };
    QPushButton *digitButtons[NumDigitButtons];
    QPushButton *addButton, *subtractButton, *multiplyButton, *divideButton;
    QPushButton *equalButton, *clearButton;

    double currentValue;
    QString pendingOperation;

    void createButtons();
    void setupLayout();
};

Calculator::Calculator(QWidget *parent)
    : QWidget(parent), currentValue(0.0) {
    display = new QLineEdit();
    display->setReadOnly(true);
    display->setAlignment(Qt::AlignRight);
    display->setMaxLength(15);

    layout = new QGridLayout();

    createButtons();
    setupLayout();

    setLayout(layout);
}

void Calculator::createButtons() {
    for (int i = 0; i < NumDigitButtons; ++i) {
        digitButtons[i] = new QPushButton(QString::number(i));
        connect(digitButtons[i], SIGNAL(clicked()), this, SLOT(buttonClicked()));
    }

    addButton = new QPushButton("+");
    subtractButton = new QPushButton("-");
    multiplyButton = new QPushButton("*");
    divideButton = new QPushButton("/");
    equalButton = new QPushButton("=");
    clearButton = new QPushButton("C");

    connect(addButton, SIGNAL(clicked()), this, SLOT(buttonClicked()));
    connect(subtractButton, SIGNAL(clicked()), this, SLOT(buttonClicked()));
    connect(multiplyButton, SIGNAL(clicked()), this, SLOT(buttonClicked()));
    connect(divideButton, SIGNAL(clicked()), this, SLOT(buttonClicked()));
    connect(equalButton, SIGNAL(clicked()), this, SLOT(buttonClicked()));
    connect(clearButton, SIGNAL(clicked()), this, SLOT(buttonClicked()));
}

void Calculator::setupLayout() {
    layout->addWidget(display, 0, 0, 1, 4);
    
    for (int i = 1; i < NumDigitButtons; ++i) {
        int row = ((9 - i) / 3) + 1;
        int col = ((i - 1) % 3);
        layout->addWidget(digitButtons[i], row, col);
    }

    layout->addWidget(digitButtons[0], 4, 1);

    layout->addWidget(addButton, 1, 3);
    layout->addWidget(subtractButton, 2, 3);
    layout->addWidget(multiplyButton, 3, 3);
    layout->addWidget(divideButton, 4, 3);
    layout->addWidget(equalButton, 4, 2);
    layout->addWidget(clearButton, 4, 0);
}

void Calculator::buttonClicked() {
    QPushButton *clickedButton = qobject_cast<QPushButton *>(sender());
    if (!clickedButton)
        return;

    QString buttonText = clickedButton->text();

    if (buttonText == "C") {
        display->clear();
        currentValue = 0.0;
        pendingOperation.clear();
    } else if (buttonText == "=") {
        double operand = display->text().toDouble();
        if (pendingOperation == "+")
            currentValue += operand;
        else if (pendingOperation == "-")
            currentValue -= operand;
        else if (pendingOperation == "*")
            currentValue *= operand;
        else if (pendingOperation == "/")
            currentValue /= operand;

        display->setText(QString::number(currentValue));
        pendingOperation.clear();
    } else {
        if (!pendingOperation.isEmpty())
            buttonClicked(); // Calculate the pending operation first

        pendingOperation = buttonText;
        currentValue = display->text().toDouble();
        display->clear();
    }
}

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    Calculator calculator;
    calculator.setWindowTitle("Simple Calculator");
    calculator.resize(300, 400);
    calculator.show();
    return app.exec();
}

#include "calculator.moc"
