import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TimerTest {
    @Test
    public void timerTest(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("springApplication.xml");
        System.out.println("配置文件加载完成");
    }
}
